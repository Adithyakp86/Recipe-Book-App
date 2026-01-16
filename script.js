// Recipe Book Application JavaScript

// State Management
let recipes = [];
let currentFilter = 'all';
let currentSearch = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    loadRecipes();
    setupEventListeners();
    addSampleRecipes();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#themeToggle i');
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Event Listeners Setup
function setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Search toggle
    document.getElementById('searchToggle').addEventListener('click', () => {
        const searchBar = document.getElementById('searchBar');
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
            document.getElementById('searchInput').focus();
        }
    });
    
    document.getElementById('searchClose').addEventListener('click', () => {
        document.getElementById('searchBar').classList.remove('active');
        document.getElementById('searchInput').value = '';
        currentSearch = '';
        renderRecipes();
    });
    
    // Search input
    document.getElementById('searchInput').addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        renderRecipes();
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderRecipes();
        });
    });
    
    // Recipe form
    document.getElementById('recipeForm').addEventListener('submit', handleFormSubmit);
    
    // Modal close
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('recipeModal').addEventListener('click', (e) => {
        if (e.target.id === 'recipeModal') {
            closeModal();
        }
    });
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Footer filter links
    document.querySelectorAll('.footer-section a[data-filter]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.dataset.filter;
            document.querySelectorAll('.filter-btn').forEach(b => {
                if (b.dataset.filter === filter) {
                    b.click();
                }
            });
            document.getElementById('recipes').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Recipe Management
function loadRecipes() {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
        recipes = JSON.parse(savedRecipes);
    }
    renderRecipes();
}

function saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
    renderRecipes();
}

function addRecipe(recipe) {
    const newRecipe = {
        id: Date.now().toString(),
        ...recipe,
        createdAt: new Date().toISOString()
    };
    recipes.push(newRecipe);
    saveRecipes();
}

function deleteRecipe(id) {
    if (confirm('Are you sure you want to delete this recipe?')) {
        recipes = recipes.filter(recipe => recipe.id !== id);
        saveRecipes();
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('recipeName').value.trim(),
        category: document.getElementById('recipeCategory').value,
        cuisine: document.getElementById('recipeCuisine').value.trim(),
        prepTime: parseInt(document.getElementById('recipeTime').value) || 0,
        image: document.getElementById('recipeImage').value.trim(),
        ingredients: document.getElementById('recipeIngredients').value
            .split('\n')
            .filter(line => line.trim())
            .map(line => line.trim()),
        instructions: document.getElementById('recipeInstructions').value
            .split('\n')
            .filter(line => line.trim())
            .map(line => line.trim())
    };
    
    addRecipe(formData);
    e.target.reset();
    
    // Show success message
    showNotification('Recipe added successfully!', 'success');
    
    // Scroll to recipes section
    document.getElementById('recipes').scrollIntoView({ behavior: 'smooth' });
}

// Rendering Functions
function renderRecipes() {
    const grid = document.getElementById('recipesGrid');
    const emptyState = document.getElementById('emptyState');
    
    let filteredRecipes = recipes;
    
    // Apply filter
    if (currentFilter !== 'all') {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.category === currentFilter);
    }
    
    // Apply search
    if (currentSearch) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            const searchLower = currentSearch.toLowerCase();
            return recipe.name.toLowerCase().includes(searchLower) ||
                   recipe.cuisine.toLowerCase().includes(searchLower) ||
                   recipe.ingredients.some(ing => ing.toLowerCase().includes(searchLower));
        });
    }
    
    if (filteredRecipes.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.add('active');
    } else {
        emptyState.classList.remove('active');
        grid.innerHTML = filteredRecipes.map(recipe => createRecipeCard(recipe)).join('');
        
        // Add event listeners to cards
        filteredRecipes.forEach(recipe => {
            document.getElementById(`recipe-${recipe.id}`).addEventListener('click', () => {
                showRecipeModal(recipe);
            });
            
            document.getElementById(`delete-${recipe.id}`).addEventListener('click', (e) => {
                e.stopPropagation();
                deleteRecipe(recipe.id);
            });
        });
    }
}

function createRecipeCard(recipe) {
    const imageHtml = recipe.image 
        ? `<img src="${recipe.image}" alt="${recipe.name}" class="recipe-image" onerror="this.parentElement.innerHTML='<div class=\\'recipe-image-placeholder\\'><i class=\\'fas fa-utensils\\'></i></div>'">`
        : `<div class="recipe-image-placeholder"><i class="fas fa-utensils"></i></div>`;
    
    return `
        <div class="recipe-card" id="recipe-${recipe.id}">
            ${imageHtml}
            <div class="recipe-content">
                <div class="recipe-header">
                    <h3 class="recipe-title">${escapeHtml(recipe.name)}</h3>
                    <span class="recipe-category">${recipe.category}</span>
                </div>
                ${recipe.cuisine ? `<p class="recipe-description">${escapeHtml(recipe.cuisine)} Cuisine</p>` : ''}
                <div class="recipe-meta">
                    ${recipe.prepTime ? `<span><i class="fas fa-clock"></i> ${recipe.prepTime} min</span>` : ''}
                    <span><i class="fas fa-list"></i> ${recipe.ingredients.length} ingredients</span>
                </div>
                <div class="recipe-actions">
                    <button class="btn-view" onclick="event.stopPropagation(); document.getElementById('recipe-${recipe.id}').click();">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn-delete" id="delete-${recipe.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `;
}

function showRecipeModal(recipe) {
    const modal = document.getElementById('recipeModal');
    const modalBody = document.getElementById('modalBody');
    
    const imageHtml = recipe.image 
        ? `<img src="${recipe.image}" alt="${recipe.name}" class="modal-recipe-image" onerror="this.style.display='none'">`
        : '';
    
    modalBody.innerHTML = `
        ${imageHtml}
        <div class="modal-recipe-header">
            <h2 class="modal-recipe-title">${escapeHtml(recipe.name)}</h2>
            <div class="modal-recipe-meta">
                <span><i class="fas fa-tags"></i> ${recipe.category}</span>
                ${recipe.cuisine ? `<span><i class="fas fa-globe"></i> ${escapeHtml(recipe.cuisine)}</span>` : ''}
                ${recipe.prepTime ? `<span><i class="fas fa-clock"></i> ${recipe.prepTime} minutes</span>` : ''}
            </div>
        </div>
        <div class="modal-section">
            <h3><i class="fas fa-list"></i> Ingredients</h3>
            <ul>
                ${recipe.ingredients.map(ing => `<li>${escapeHtml(ing)}</li>`).join('')}
            </ul>
        </div>
        <div class="modal-section">
            <h3><i class="fas fa-tasks"></i> Instructions</h3>
            <ol>
                ${recipe.instructions.map(inst => `<li>${escapeHtml(inst)}</li>`).join('')}
            </ol>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('recipeModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Sample Recipes
function addSampleRecipes() {
    if (recipes.length === 0) {
        const sampleRecipes = [
            {
                name: "Classic Chocolate Chip Cookies",
                category: "dessert",
                cuisine: "American",
                prepTime: 30,
                image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800",
                ingredients: [
                    "2 1/4 cups all-purpose flour",
                    "1 tsp baking soda",
                    "1 tsp salt",
                    "1 cup butter, softened",
                    "3/4 cup granulated sugar",
                    "3/4 cup brown sugar",
                    "2 large eggs",
                    "2 tsp vanilla extract",
                    "2 cups chocolate chips"
                ],
                instructions: [
                    "Preheat oven to 375°F (190°C)",
                    "Mix flour, baking soda, and salt in a bowl",
                    "Beat butter and sugars until creamy",
                    "Add eggs and vanilla, beat well",
                    "Gradually blend in flour mixture",
                    "Stir in chocolate chips",
                    "Drop rounded tablespoons onto ungreased baking sheets",
                    "Bake for 9-11 minutes until golden brown"
                ]
            },
            {
                name: "Avocado Toast",
                category: "breakfast",
                cuisine: "Modern",
                prepTime: 10,
                image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800",
                ingredients: [
                    "2 slices sourdough bread",
                    "1 ripe avocado",
                    "Salt and pepper to taste",
                    "Red pepper flakes",
                    "Lemon juice",
                    "2 eggs (optional)",
                    "Cherry tomatoes (optional)"
                ],
                instructions: [
                    "Toast the bread until golden brown",
                    "Mash the avocado with a fork",
                    "Add salt, pepper, and a squeeze of lemon",
                    "Spread avocado on toast",
                    "Top with red pepper flakes",
                    "Optional: Add poached eggs and sliced tomatoes"
                ]
            },
            {
                name: "Spaghetti Carbonara",
                category: "dinner",
                cuisine: "Italian",
                prepTime: 25,
                image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
                ingredients: [
                    "400g spaghetti",
                    "200g pancetta or bacon",
                    "4 large eggs",
                    "100g Parmesan cheese, grated",
                    "Black pepper",
                    "Salt"
                ],
                instructions: [
                    "Cook spaghetti in salted boiling water",
                    "Cut pancetta into small cubes and fry until crispy",
                    "Beat eggs with grated Parmesan and black pepper",
                    "Drain pasta, reserving some pasta water",
                    "Mix hot pasta with pancetta",
                    "Remove from heat and quickly mix in egg mixture",
                    "Add pasta water if needed for creaminess",
                    "Serve immediately with extra Parmesan"
                ]
            },
            {
                name: "Caesar Salad",
                category: "lunch",
                cuisine: "American",
                prepTime: 15,
                image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800",
                ingredients: [
                    "1 head romaine lettuce",
                    "1/2 cup Caesar dressing",
                    "1/4 cup Parmesan cheese, grated",
                    "Croutons",
                    "Anchovies (optional)",
                    "Lemon wedges"
                ],
                instructions: [
                    "Wash and chop romaine lettuce",
                    "Dry lettuce thoroughly",
                    "Toss lettuce with Caesar dressing",
                    "Add croutons and Parmesan cheese",
                    "Garnish with anchovies if desired",
                    "Serve with lemon wedges"
                ]
            }
        ];
        
        sampleRecipes.forEach(recipe => {
            addRecipe(recipe);
        });
    }
}
