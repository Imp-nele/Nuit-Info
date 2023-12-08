let score=0;

document.addEventListener('DOMContentLoaded', function() {
  const questionContainer = document.querySelector('.questions');
  const scoreElement = document.querySelector('.points');
  const solutionElement = document.getElementById('solution');

  let isCorrect = false; // Ajout de la variable isCorrect

  questionContainer.addEventListener('change', function(event) {
    const selectedOption = event.target;

    // Si le bouton "Valider" n'a pas été cliqué, ne pas afficher la solution
    hideSolution();
  });

  const validateBtn = document.getElementById('validateBtn');

  if (validateBtn) {
    validateBtn.addEventListener('click', () => {
      const selectedOption = document.querySelector('input[name="question1"]:checked');
      const currentQuestionElement = document.querySelector('.question');
      
      if (selectedOption) {
        isCorrect = selectedOption.value === currentQuestionElement.dataset.correct;

        if (isCorrect) {
          score +=10;
        }

        updateScore();
        showSolution(isCorrect, currentQuestionElement);
        showDescription(); // Afficher la description
        hideValidateButton(); // Masquer le bouton "Valider"
        showArrow(); // Afficher la flèche
      }
    });
  }

  function updateScore() {
    scoreElement.textContent = score + ' pts';
  }

  function showSolution(isCorrect, currentQuestionElement) {
    const solutionText = isCorrect ? 'Bonne réponse!' : 'Mauvaise réponse!';
    const solutionColor = isCorrect ? 'green' : 'red';
    const solutionFeedback = currentQuestionElement.querySelector('.feedback');

    solutionFeedback.textContent = solutionText;
    solutionFeedback.style.color = solutionColor;

    solutionElement.classList.add('show');
  }

  function hideSolution() {
    solutionElement.classList.remove('show');

    setTimeout(() => {
      solutionElement.textContent = '';
    }, 500);
  }

  function showDescription() {
    const descriptionContainer = document.querySelector('.description-container');
    if (descriptionContainer) {
      const descriptionElement = descriptionContainer.querySelector('.description');
      if (descriptionElement) {
        descriptionElement.style.display = 'block';
        // Ajouter la classe correcte ou incorrecte en fonction de la réponse
        descriptionElement.classList.add(isCorrect ? 'correct' : 'incorrect');
      }
    }
  }
  
  function hideValidateButton() {
    if (validateBtn) {
      validateBtn.style.display = 'none';
    }
  }

  function showArrow() {
    const arrowContainer = document.querySelector('.arrow-container');
    
    if (arrowContainer) {
      const arrowElement = arrowContainer.querySelector('.arrowlink');
      
      if (arrowElement) {
        arrowElement.style.display = 'flex';
      }
    }
  }
  
  window.onload = function () {
    let bar = document.querySelectorAll('.bar');
    bar.forEach((progress) => {
      let value = progress.getAttribute('data-value');
      progress.style.width = `${value}%`;
    });
  };

  updateScore();
});
