# Recipe Book App 🍳

A beautiful, modern Recipe Book application built with vanilla JavaScript, featuring a responsive design, dark/light theme toggle, and full CRUD functionality for managing your favorite recipes.

## Features ✨

- **Beautiful Modern UI**: Clean, responsive design that works on all devices
- **Dark/Light Theme**: Toggle between light and dark themes with persistent storage
- **Recipe Management**: Add, view, and delete recipes with ease
- **Search Functionality**: Search recipes by name, ingredient, or cuisine
- **Category Filtering**: Filter recipes by category (Breakfast, Lunch, Dinner, Dessert)
- **Recipe Details Modal**: View full recipe details in a beautiful modal
- **Local Storage**: All recipes are saved locally in your browser
- **Sample Recipes**: Includes 4 sample recipes to get you started

## Project Structure 📁

```
Recipe-Book-App/
├── index.html      # Main HTML structure
├── styles.css      # All styling with theme support
├── script.js       # Application logic and functionality
└── README.md       # Project documentation
```

## Getting Started 🚀

1. **Open the Application**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required!

2. **Using the App**
   - Browse sample recipes on the home page
   - Use the search bar to find specific recipes
   - Filter recipes by category using the filter buttons
   - Click "Add Recipe" to create your own recipes
   - Click on any recipe card to view full details
   - Toggle between light/dark themes using the moon/sun icon

## Features in Detail 🔍

### Header
- Sticky navigation bar with logo
- Quick navigation links
- Theme toggle button
- Search toggle button

### Hero Section
- Eye-catching gradient background
- Call-to-action button

### Recipes Section
- Grid layout displaying recipe cards
- Category filters
- Search functionality
- Empty state when no recipes match

### Add Recipe Form
- Comprehensive form with all recipe details
- Image URL support
- Ingredients and instructions input
- Form validation

### Footer
- Links to all sections
- Social media icons
- Category quick links
- Contact information

## Technologies Used 💻

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables, flexbox, and grid
- **JavaScript (ES6+)**: Vanilla JavaScript with modern features
- **Font Awesome**: Icons for better UI
- **Local Storage API**: For data persistence

## Browser Support 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization 🎨

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --accent-color: #ff6b6b;  /* Change this for accent color */
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Adding More Categories
1. Update the category select in `index.html`
2. Add filter button in the recipes section
3. Update footer links if needed

## Future Enhancements 🚀

Potential features to add:
- Recipe editing functionality
- Recipe sharing
- Print recipe feature
- Recipe favorites/bookmarks
- Export recipes to PDF
- Recipe ratings and reviews
- Meal planning calendar

## License 📄

This project is open source and available for personal and commercial use.

## Credits 🙏

- Icons: [Font Awesome](https://fontawesome.com)
- Images: [Unsplash](https://unsplash.com) (for sample recipes)

---

Made with ❤️ for food lovers everywhere!
