    let dialogLines = [];
    let currentLineIndex = 0;
    const element = document.querySelector(".text");
    const dialogSpan = document.getElementById("dialog");

    async function getData() {
      const url = "thing.json";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        dialogLines = result.map(item => item.line);  
        console.log('JSON data loaded:', dialogLines);
        if (dialogLines.length > 0) {
          textTypingEffect(dialogLines[0], element);
        }
      } catch (error) {
        console.error('Fetch error:', error.message);
        dialogSpan.textContent = 'Error loading data';
      }
    }

    let timeOutId

    function textTypingEffect(message, element, i = 0) {
      if (i === 0) {
        element.innerHTML = "";
      }
      element.innerHTML += message[i];

      if (i === message.length - 1) {
        typeRunning = false
        return;
      }
      
     timeOutId = setTimeout(() => textTypingEffect(message, element, i + 1), 50);
     typeRunning = true
     console.log(typeRunning)
    }

    let typeRunning = false

    function nextLine() {

      if(typeRunning == true && dialogLines.length > currentLineIndex){
        clearTimeout(timeOutId)
        element.innerHTML = dialogLines[currentLineIndex]
        typeRunning = false
        console.log(typeRunning)
      }
      else if(currentLineIndex < dialogLines.length) {
        currentLineIndex++;
        textTypingEffect(dialogLines[currentLineIndex], element);


      } else {
        console.log('End of lines');
      
      }
    }


    document.getElementById("next-line-button").addEventListener("click", nextLine);

    window.addEventListener("load", getData);  