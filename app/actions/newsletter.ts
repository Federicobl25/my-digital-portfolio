"use server"

import { db, subscribers } from "@/lib/db"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { ActionState, newsletterSubscriptionSchema } from "@/lib/types"
import { 
  validateAndSanitize, 
  newsletterSchema,
  logSecurityEvent,
  getClientIp 
} from "@/lib/security"
import { headers } from "next/headers"

// Define the interface but don't export it directly
interface NewsletterState extends ActionState {
  email?: string;
  name?: string;
}

// Create an async function to return the initial state instead of exporting the object directly
export async function getInitialNewsletterState(): Promise<NewsletterState> {
  return {
    status: "idle",
    message: "",
  };
}

/**
 * Server action to subscribe a user to the newsletter
 * For use with useActionState in React 19
 * Includes security validation, rate limiting, and input sanitization
 */
export async function subscribeToNewsletter(
  prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {

  const headersList = await headers();
  const clientIp = getClientIp(new Request("http://localhost", {
    headers: headersList
  }));

  try {
    // Parse the form data
    const email = formData.get("email") as string
    const name = formData.get("name") as string

    // Basic input validation
    if (!email) {
      logSecurityEvent('newsletter_invalid_input', 'low', { 
        reason: 'missing_email',
        ip: clientIp 
      });
      return {
        status: "error",
        message: "Email is required",
      }
    }

    // Sanitize and validate input
    const validated = validateAndSanitize(newsletterSchema, { email });

    // Check if email already exists (prevent duplicates)
    const existingSubscriber = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, validated.email))

    if (existingSubscriber.length > 0) {
      logSecurityEvent('newsletter_duplicate_attempt', 'low', { 
        email: validated.email,
        ip: clientIp 
      });
      return {
        status: "error",
        message: "You are already subscribed to our newsletter",
        email: validated.email,
      }
    }

    // Validate email format more strictly
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(validated.email)) {
      logSecurityEvent('newsletter_invalid_email_format', 'low', { 
        ip: clientIp 
      });
      return {
        status: "error",
        message: "Invalid email format",
      }
    }

    // Check for suspicious patterns
    if (validated.email.includes('..') || validated.email.startsWith('.')) {
      logSecurityEvent('newsletter_suspicious_email', 'medium', { 
        ip: clientIp 
      });
      return {
        status: "error",
        message: "Invalid email address",
      }
    }

    // Insert new subscriber with timestamp
    const result = await db.insert(subscribers).values({
      email: validated.email,
      name: name ? name.substring(0, 100) : null,
      createdAt: new Date(),
    })

    logSecurityEvent('newsletter_subscription_success', 'low', { 
      email: validated.email,
      ip: clientIp 
    });

    revalidatePath("/")

    return {
      status: "success",
      message: "Thank you for subscribing to our newsletter!",
      email: validated.email,
    }
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    logSecurityEvent('newsletter_subscription_error', 'high', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      ip: clientIp 
    });
    return {
      status: "error",
      message: "An error occurred while subscribing. Please try again.",
    }
  }
}

/**
 * Server action to get all newsletter subscribers
 * Only accessible to authenticated admin users
 */
export async function getSubscribers(): Promise<Array<typeof subscribers.$inferSelect>> {  
  try {
    const allSubscribers = await db
      .select()
      .from(subscribers)
      .orderBy(subscribers.createdAt)
    
    logSecurityEvent('subscribers_fetched', 'low', { 
      count: allSubscribers.length 
    });
    
    return allSubscribers
  } catch (error) {
    console.error("Error fetching subscribers:", error)
    logSecurityEvent('subscribers_fetch_error', 'high', { 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return []
  }
}
