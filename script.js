document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const recipeResults = document.getElementById('recipeResults');

    // Dummy recipe data (replace with actual API calls in a real application)
    const recipes = [
        {
            id: 1, // Added an ID for unique identification
            name: "Frango Grelhado com Legumes",
            ingredients: ["Peito de frango", "Brócolis", "Cenoura", "Azeite", "Sal", "Pimenta"],
            instructions: "Grelhe o frango temperado e cozinhe os legumes no vapor."
        },
        {
            id: 2,
            name: "Salmão Assado com Aspargos",
            ingredients: ["Filé de salmão", "Aspargos", "Limão", "Alho", "Azeite", "Dill"],
            instructions: "Asse o salmão com aspargos e temperos por 15-20 minutos."
        },
        {
            id: 3,
            name: "Filé Mignon com Purê de Couve-flor",
            ingredients: ["Filé mignon", "Couve-flor", "Manteiga ghee", "Creme de leite", "Noz-moscada"],
            instructions: "Prepare o filé e o purê de couve-flor como acompanhamento."
        },
        {
            id: 4,
            name: "Camarão ao Alho e Óleo",
            ingredients: ["Camarão", "Alho", "Azeite", "Salsinha", "Pimenta do reino", "Limão"],
            instructions: "Refogue o camarão com alho e azeite. Finalize com salsinha e limão."
        },
        {
            id: 5,
            name: "Torta de Frango Low Carb",
            ingredients: ["Peito de frango desfiado", "Ovos", "Requeijão low carb", "Queijo ralado", "Creme de leite"],
            instructions: "Prepare a massa low carb e recheie com frango cremoso. Asse até dourar."
        },
        {
            id: 6,
            name: "Peixe Branco Assado com Ervas",
            ingredients: ["Filé de tilápia", "Tomilho", "Alecrim", "Limão siciliano", "Azeite", "Sal"],
            instructions: "Tempere o peixe e asse no forno com as ervas e rodelas de limão."
        }
    ];

    const displayRecipes = (filteredRecipes) => {
        recipeResults.innerHTML = ''; // Clear previous results

        if (filteredRecipes.length === 0) {
            recipeResults.innerHTML = '<p class="no-results">Nenhuma receita encontrada. Tente outra palavra-chave.</p>';
            return;
        }

        filteredRecipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            const ingredientsList = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');

            recipeCard.innerHTML = `
                <h2>${recipe.name}</h2>
                <div class="ingredients">
                    <h3>Ingredientes:</h3>
                    <ul>${ingredientsList}</ul>
                </div>
                <h3>Modo de Preparo:</h3>
                <p>${recipe.instructions}</p>
                <button class="favorite-button" data-recipe-id="${recipe.id}" data-recipe-name="${recipe.name}">Salvar como Favorito</button>
            `;
            recipeResults.appendChild(recipeCard);
        });

        // Attach event listeners to the new favorite buttons
        document.querySelectorAll('.favorite-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const recipeId = event.target.dataset.recipeId;
                const recipeName = event.target.dataset.recipeName;
                saveRecipeAsFavorite(recipeId, recipeName);
            });
        });
    };

    const saveRecipeAsFavorite = (id, name) => {
        // In a real application, you would send this data to your backend
        // (e.g., to the "Serviço de Receitas" or "Serviço de Usuários/Perfis" 
        // to save the recipe as a favorite for the logged-in user).
        console.log(`Receita "${name}" (ID: ${id}) salva como favorita!`);
        alert(`"${name}" foi salva como sua receita favorita!`); // User feedback
        // You might also change the button text or style to indicate it's saved
        // event.target.textContent = 'Salvo!';
        // event.target.disabled = true;
    };

    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let filteredRecipes = [];

        if (searchTerm === '') {
            recipeResults.innerHTML = '<p class="no-results">Por favor, digite um ingrediente para buscar receitas.</p>';
            return;
        } else {
            filteredRecipes = recipes.filter(recipe =>
                recipe.name.toLowerCase().includes(searchTerm) ||
                recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))
            );
        }
        displayRecipes(filteredRecipes);
    };

    // Initial prompt for the user to search
    recipeResults.innerHTML = '<p class="no-results">Pesquise por receitas usando ingredientes como frango, peixe, filé, camarão ou salmão.</p>';


    // Event listeners
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});
