
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
          let pts=10;
          actualiser(pts);
        }

        //updateScore();
        showSolution(isCorrect, currentQuestionElement);
        showDescription(); // Afficher la description
        hideValidateButton(); // Masquer le bouton "Valider"
        showArrow(); // Afficher la flèche
      }
    });
  }

  /*function updateScore() {
    scoreElement.textContent = score + ' pts';
  }*/

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

  //updateScore();
});

function actualiser(pts) // pts: variable dans ta fct, celle qui enregistre les pts)
{
  //localStorage.setItem("pts",pts); // on enregistre les points de la réponse
  if(sessionStorage.getItem("globalpts")==null) // on vérifie s'il y a des pts déjà enregistrés
  sessionStorage.setItem("globalpts",pts); // si non, les pts gagnés sont enregistrés
  else // s'il y a des points déjà enregistrés on additionne ceux enregistrés et ceux qui viennent d'être obtenus 
  {
    let globalpts= parseFloat(sessionStorage.getItem("globalpts"));
    sessionStorage.setItem("globalpts",pts+globalpts);
  }
} 
if(sessionStorage.getItem("globalpts")!=null)// Affichage des points
    document.getElementById("pts").innerHTML = sessionStorage.getItem("globalpts")+ " pts";
  else
    document.getElementById("pts").innerHTML = "0 pts";
