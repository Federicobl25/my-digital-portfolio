// Load environment variables
require('dotenv').config({ path: '.env' });

const { neon } = require('@neondatabase/serverless');

async function main() {
  console.log('Adding Australian Cuisine blog post...');

  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  console.log('Connecting to database...');
  
  const sql = neon(connectionString);

  try {
    const blogTitle = 'Professional Australian Cooking Techniques: A Chef\'s Guide to Modern Gastronomy';
    const blogSlug = 'australian-cooking-techniques-professional-' + Date.now();
    const blogExcerpt = 'Exploring the finest professional cooking techniques used in Australia\'s top restaurants, from native ingredient preparation to innovative modern methods.';
    const blogContent = `<p>Australian cuisine has evolved dramatically over the past two decades, establishing itself as one of the world's most innovative and respected culinary scenes. This comprehensive guide explores the professional cooking techniques that define modern Australian gastronomy, from ingredient selection to advanced preparation methods used by the country's leading chefs.</p>

<h2>Understanding Australian Culinary Philosophy</h2>

<p>Professional Australian cooking is built on three fundamental principles that differentiate it from other culinary traditions:</p>

<ul>
<li><strong>Ingredient-Driven:</strong> Seasonal, locally-sourced ingredients take center stage</li>
<li><strong>Technique-Focused:</strong> Mastery of cooking methods that enhance rather than mask flavors</li>
<li><strong>Innovation-Led:</strong> Blending traditional techniques with modern culinary science</li>
</ul>

<h3>The Importance of Ingredient Quality</h3>

<p>Professional Australian chefs understand that exceptional ingredients require minimal intervention. The technique lies in selecting ingredients at peak ripeness and preparing them in ways that amplify their natural characteristics.</p>

<p>Key professional practices include:</p>
<ul>
<li>Building relationships directly with farmers and producers</li>
<li>Understanding seasonal windows for optimal quality and flavor</li>
<li>Knowing the terroir and origin of ingredients</li>
<li>Adapting menus based on ingredient availability</li>
</ul>

<h2>Native Ingredient Preparation Techniques</h2>

<h3>Working with Native Herbs and Spices</h3>

<p>Australian native ingredients require specific techniques to unlock their unique flavors:</p>

<h4>Finger Limes (Citrus australasica)</h4>
<p>Professional chefs use several techniques:</p>
<ul>
<li><strong>Segmentation:</strong> Carefully extracting the juice-filled caviar-like segments without damaging them</li>
<li><strong>Juice Expression:</strong> Gentle pressing to release concentrated flavor without bitterness</li>
<li><strong>Zesting:</strong> Avoiding the white pith which contains undesirable bitter compounds</li>
<li><strong>Drying:</strong> Creating finger lime dust for garnishing and flavor layering</li>
</ul>

<h4>Bush Tomato (Solanum centrale)</h4>
<p>Professional preparation methods:</p>
<ul>
<li><strong>Drying:</strong> Sun-drying or oven-drying at controlled temperatures (55-60°C) to concentrate flavors</li>
<li><strong>Grinding:</strong> Creating aromatic powder for seasoning and umami enhancement</li>
<li><strong>Rehydration:</strong> Precise timing to achieve optimal texture for sauce making</li>
<li><strong>Fermentation:</strong> Developing complex flavors through controlled bacterial and fungal cultures</li>
</ul>

<h4>Kakadu Plums (Terminalia ferdinandiana)</h4>
<p>Techniques for maximizing nutritional and flavor potential:</p>
<ul>
<li><strong>Cold-Pressing:</strong> Extraction of vitamin C-rich juice without heat degradation</li>
<li><strong>Pulping:</strong> Creating smooth purees for desserts and sauces</li>
<li><strong>Powder Production:</strong> Freeze-drying technology for preservation of nutritional value</li>
<li><strong>Acid Adjustment:</strong> Balancing the fruit's natural tartness in composed dishes</li>
</ul>

<h3>Wattleseed and Other Native Spices</h3>

<p>Professional chefs employ specific techniques for native spices:</p>

<p><strong>Wattleseed (Acacia victoriae):</strong></p>
<ul>
<li>Toasting at precise temperatures (160-180°C) to develop nutty, slightly sweet notes</li>
<li>Grinding to consistency appropriate for application (fine powder vs. coarse grind)</li>
<li>Blooming in fats or hot liquids to release essential oils</li>
<li>Careful storage in airtight containers to preserve volatile aromatics</li>
</ul>

<p><strong>Lemon Myrtle (Backhousia citriodora):</strong></p>
<ul>
<li>Fresh leaf handling to prevent bruising and oil loss</li>
<li>Drying techniques that preserve bright lemon notes</li>
<li>Infusion methods for teas and cooking liquids</li>
<li>Extraction timing to balance fragrance with potency</li>
</ul>

<h2>Seafood Handling and Preparation Techniques</h2>

<h3>Working with Australian Seafood</h3>

<p>Australia's pristine waters provide some of the world's finest seafood. Professional techniques ensure optimal quality:</p>

<h4>Fish Filleting and Butchery</h4>
<ul>
<li><strong>Japanese-Influenced Knife Skills:</strong> Using sharp knives at precise angles to minimize cell damage</li>
<li><strong>Skin-on Preparation:</strong> Technique for achieving crispy skin while maintaining moist flesh</li>
<li><strong>Bones and Trimmings:</strong> Creating stocks and broths from the entire fish for zero-waste cooking</li>
<li><strong>Portion Control:</strong> Cutting portions that account for cooking shrinkage and plate presentation</li>
</ul>

<h4>Shellfish Handling</h4>
<p>Professional methods for oysters, barramundi, and other shellfish:</p>
<ul>
<li><strong>Temperature Control:</strong> Keeping shellfish at precise temperatures before service</li>
<li><strong>Opening Technique:</strong> Clean oyster shucking without shell fragments or juice loss</li>
<li><strong>Freshness Assessment:</strong> Professional grading criteria for shellfish quality</li>
<li><strong>Storage Methods:</strong> Optimal conditions to maintain texture and flavor until service</li>
</ul>

<h3>Curing and Preserving Techniques</h3>

<p>Traditional preservation methods used in professional Australian kitchens:</p>

<h4>Salt Curing</h4>
<ul>
<li>Calculating precise salt ratios based on fish type and size</li>
<li>Timing curing cycles to achieve optimal salt penetration</li>
<li>Rinsing and drying techniques for final product quality</li>
<li>Aging in controlled environments to develop deep, complex flavors</li>
</ul>

<h4>Hot Smoking</h4>
<ul>
<li>Temperature management (60-80°C) for optimal smoke flavor without overcooking</li>
<li>Smoke source selection (wood type affects final flavor profile)</li>
<li>Brining techniques before smoking to enhance moisture retention</li>
<li>Post-smoking finishing methods</li>
</ul>

<h2>Meat Cookery and Advanced Techniques</h2>

<h3>Beef Preparation</h3>

<p>Australian beef is renowned globally. Professional techniques maximize quality:</p>

<ul>
<li><strong>Dry-Aging:</strong> Precise humidity and temperature control (50-55% humidity, 0-4°C) for enzymatic tenderization and flavor concentration</li>
<li><strong>Butchering:</strong> Understanding muscle groups and cutting against the grain</li>
<li><strong>Sous Vide:</strong> Vacuum-sealing and precise temperature water bath cooking (54-65°C) for consistent results</li>
<li><strong>Reverse Searing:</strong> Low-temperature finishing followed by high-heat searing for perfect crust and edge-to-edge cook</li>
<li><strong>Resting:</strong> Critical timing (rest = cooking time / 2) to allow carryover cooking and moisture redistribution</li>
</ul>

<h3>Game Meat Handling</h3>

<p>Professional techniques for native game including kangaroo, wallaby, and emu:</p>

<ul>
<li><strong>Aging Process:</strong> Controlled aging to develop flavor and tenderize lean meat</li>
<li><strong>Marinading:</strong> Acid-based marinades to break down tough muscle fibers</li>
<li><strong>Cooking Temperature:</strong> Lower temperatures (60-62°C for medium-rare) to prevent drying out lean cuts</li>
<li><strong>Fat Integration:</strong> Techniques for adding necessary fats (larding, barding) to enhance juiciness</li>
<li><strong>Flavor Pairing:</strong> Indigenous ingredients that complement game's distinctive flavors</li>
</ul>

<h2>Vegetable and Produce Techniques</h2>

<h3>Vegetable Cookery Methods</h3>

<p>Professional Australian chefs use multiple cooking methods to showcase vegetables:</p>

<h4>Charring and Grilling</h4>
<ul>
<li>Achieving high-heat marks while maintaining tenderness inside</li>
<li>Controlled charring that adds depth without bitterness</li>
<li>Timing and temperature management for consistent results</li>
</ul>

<h4>Root Vegetable Techniques</h4>
<ul>
<li><strong>Confit:</strong> Long, slow cooking in fat at low temperatures (70-80°C) for maximum tenderness</li>
<li><strong>Pureing:</strong> Achieving silky textures through proper food mill or blender techniques</li>
<li><strong>Layering:</strong> Building depth of flavor through multiple cooking methods in single preparation</li>
</ul>

<h3>Fermentation Techniques</h3>

<p>Modern professional Australian kitchens employ fermentation:</p>

<ul>
<li><strong>Lacto-Fermentation:</strong> Creating probiotics and complex flavors in 3-21 day cycles</li>
<li><strong>Miso Production:</strong> Salt, temperature, and time management for umami-rich pastes</li>
<li><strong>Kombucha and Vinegars:</strong> Controlled fermentation for house-made condiments</li>
<li><strong>Vegetable Pickles:</strong> Acid and salt balancing for texture preservation</li>
</ul>

<h2>Sauce and Stock Production</h2>

<h3>Professional Stock Making</h3>

<p>Foundation of professional Australian cooking:</p>

<ul>
<li><strong>Bone Selection:</strong> Choosing appropriate bones based on desired flavor intensity</li>
<li><strong>Temperature Control:</strong> Maintaining gentle simmer (85-95°C) to prevent cloudiness and develop clear stock</li>
<li><strong>Skimming:</strong> Removing impurities for clean, refined final product</li>
<li><strong>Timing:</strong> Calculating cook times based on bone type (24-72 hours for optimal extraction)</li>
<li><strong>Straining:</strong> Multi-stage filtering for clarity and refinement</li>
</ul>

<h3>Sauce Emulsification</h3>

<p>Professional techniques for creating stable emulsions:</p>

<ul>
<li><strong>Temperature Management:</strong> Precise temperature control (60-70°C) for hollandaise and emulsion sauces</li>
<li><strong>Whisking Technique:</strong> Proper emulsifier suspension for stable sauces</li>
<li><strong>Fat Addition:</strong> Slow, gradual incorporation to prevent breaking</li>
<li><strong>Acid Balancing:</strong> Using lemon juice or vinegar to stabilize and preserve sauces</li>
</ul>

<h2>Plating and Presentation Techniques</h2>

<h3>Modern Australian Plating Philosophy</h3>

<p>Contemporary professional plating focuses on:</p>

<ul>
<li><strong>Negative Space:</strong> Strategic use of white space for visual impact</li>
<li><strong>Height and Dimension:</strong> Three-dimensional composition for restaurant quality presentation</li>
<li><strong>Color Theory:</strong> Complementary colors from natural ingredients</li>
<li><strong>Temperature Service:</strong> Proper plate and bowl temperatures for optimal ingredient performance</li>
</ul>

<h3>Garnishing Techniques</h3>

<p>Professional garnishes that enhance rather than distract:</p>

<ul>
<li>Microherb cultivation and handling for consistency</li>
<li>Native flower selection and food safety protocols</li>
<li>Edible soil and ash creation for textural variety</li>
<li>Oil extraction and presentation techniques</li>
</ul>

<h2>Food Safety and Professional Standards</h2>

<h3>HACCP Principles</h3>

<p>Professional Australian kitchens follow strict safety protocols:</p>

<ul>
<li>Time and temperature documentation</li>
<li>Allergen management and cross-contamination prevention</li>
<li>Ingredient traceability systems</li>
<li>Staff training and certification requirements</li>
</ul>

<h3>Quality Assurance</h3>

<ul>
<li>Daily ingredient inspection and rotation (FIFO)</li>
<li>Temperature monitoring of storage and cooking</li>
<li>Sensory evaluation protocols for consistency</li>
<li>Recipe standardization and documentation</li>
</ul>

<h2>Contemporary Tools and Technology</h2>

<h3>Advanced Equipment</h3>

<p>Modern professional kitchens integrate technology:</p>

<ul>
<li><strong>Sous Vide Immersion Circulators:</strong> Precise temperature control for consistent results</li>
<li><strong>Smoking Guns:</strong> Controlled smoke flavor application at service</li>
<li><strong>Precision Scales:</strong> Accurate measurement for recipe consistency</li>
<li><strong>Thermal Imaging:</strong> Monitoring internal temperatures without cutting</li>
<li><strong>Vacuum Sealers:</strong> Extending ingredient shelf life and enabling proper storage</li>
</ul>

<h2>Continuous Learning and Professional Development</h2>

<p>Australia's top chefs maintain their edge through:</p>

<ul>
<li>Participation in masterclasses with international chefs</li>
<li>Study of ingredient quality and seasonal variations</li>
<li>Experimentation with traditional and modern techniques</li>
<li>Mentorship of emerging culinary talent</li>
<li>Documentation of techniques and recipes for consistency</li>
</ul>

<h2>Conclusion</h2>

<p>Professional Australian cooking is characterized by deep respect for ingredients, mastery of fundamental techniques, and innovative thinking. By understanding these techniques—from native ingredient preparation to advanced meat cookery—chefs can create dishes that showcase Australia's unique culinary identity on the world stage.</p>

<p>The future of Australian gastronomy lies in the careful balance between honoring traditional preparation methods and embracing modern culinary science. Professional chefs who master both dimensions will continue to elevate Australian cuisine's reputation as one of the world's most exciting and respected culinary movements.</p>`;
    
    const blogAuthor = 'Fede';
    const blogReadTime = '18 min read';
    const blogCoverImage = '/australian-cuisine.png';

    console.log('Inserting blog post...');
    const result = await sql`
      INSERT INTO blog_posts (title, slug, excerpt, content, author, read_time, cover_image)
      VALUES (
        ${blogTitle},
        ${blogSlug},
        ${blogExcerpt},
        ${blogContent},
        ${blogAuthor},
        ${blogReadTime},
        ${blogCoverImage}
      )
      RETURNING id, title, slug;
    `;

    console.log('✅ Blog post created successfully!');
    console.log('Post details:', result[0]);
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to add blog post:', error.message);
    process.exit(1);
  }
}

main();
