    let dialogLines = [];
    let namePerson = [];
    let currentLineIndex = 0;
    let currentNameIndex = 0;
    const element = document.querySelector(".text");
    const dialogSpan = document.getElementById("dialog");
    const nameLine = document.getElementById("nameSpan")
    const nameDiv = document.querySelector(".personName")

    async function getData() {
      const url = "thing.json";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        dialogLines = result.map(item => item.line);
        namePerson = result.map(item => item.name)  
        console.log('JSON data loaded:', dialogLines);
        console.log('JSON data loaded:', namePerson);
  
        if (namePerson.length > 0) {
          nameDiv.innerHTML = namePerson[0], currentNameIndex
        }

        if (dialogLines.length > 0) {
          textTypingEffect(dialogLines[0], element);
        }

      } 
        catch (error) {
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
        currentNameIndex++;
        textTypingEffect(dialogLines[currentLineIndex], element);
        nameDiv.innerHTML = namePerson[currentNameIndex]


      } else {
        console.log('End of lines');
      
      }
    }


    window.addEventListener("load", getData);  
    document.getElementById("next-line-button").addEventListener("click", nextLine);
