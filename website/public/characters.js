const cookies = document.cookie.split(';');
let characterIdCharacters;
let selectedGameCharacters;
let characterCreatedCharacters;
let characterCreatedForGameCharacters;

cookies.forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    switch (name) {
        case 'characterId':
            characterIdCharacters = value;
            console.log('characterId: ' + characterIdCharacters);
            break;
        case 'selectedGame':
            selectedGameCharacters = value;
            console.log('selectedGame: ' + selectedGameCharacters);
            break;
        case 'characterCreated':
            characterCreatedCharacters = value;
            console.log('characterCreated: ' + characterCreatedCharacters);
            break;
        case 'characterCreatedForGame':
            characterCreatedForGameCharacters = value;
            console.log('characterCreatedForGame: ' + characterCreatedForGameCharacters);
            break;
        default:
            break;
    }
});



const baseURL =  "http://localhost:4005/characters/"

const orderedList = document.getElementById("list-of-char")
const baseURLCharacterCreation = "http://localhost:4005/character-creation/"

// Menu
const menuIcon = document.getElementById('openNav')
const characterCreationLink = document.getElementById('characterCreationLink')
const sideNav = document.getElementById('mySidenav')
const closeBtn = sideNav.querySelector('.closebtn')

// console.log("Print 1")

const allCharacters = (body) => {
    // console.log('allCharacters is working');
    // console.log(body)
    // Assuming 'orderedList' is the <ul> element where you want to append the <li> items
    const orderedList = document.getElementById('list-of-char');

    body.forEach((character) => {
        let list = document.createElement('li');
        let link = document.createElement('a');
        link.href = 'character-creation.html' //`${baseURLCharacterCreation}${character.id}`;
        link.name = "characters"
        link.value = `${character.id}`
        list.class = "characters"
        link.innerText = `${character.char_name}`;
        list.appendChild(link); // Append the link to the list item
        orderedList.appendChild(list); // Append the list item to the ordered list
    });

    characterCreationLink.href = 'character-creation.html'

    sendDataAndNavigate()
};

const sendDataAndNavigate = () => {
    // Get the selected game value
    console.log("sending decisions")
    const characterLinks = document.querySelectorAll('a[name="characters"]');

    // Attach event handler to each anchor element
    characterLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent the default behavior of the anchor element
            event.preventDefault()
        
            // Get the href attribute value of the clicked anchor element
            const href = this.getAttribute('href');
        
            const selectedGame = false;
            const characterId = link.value;
            const characterCreated = true;
            const characterCreatedForGame = false;
        
            // Set cookies
            document.cookie = `characterId=${characterId}`
            document.cookie = `selectedGame=${selectedGame}`
            document.cookie = `characterCreated=${characterCreated}`
            document.cookie = `characterCreatedForGame=${characterCreatedForGame}`
        
            // Log the href value to identify which link was clicked
            console.log('Clicked link:', href);
            console.log('characterId = ', characterId);
        
            // Wait for 100 milliseconds to ensure cookies are updated
            setTimeout(() => {
                // Read cookies
                const cookies = document.cookie.split('; ');
                let characterIdCharacters;
                let selectedGameCharacters;
                let characterCreatedCharacters;
                let characterCreatedForGameCharacters;
        
                cookies.forEach(cookie => {
                    const [name, value] = cookie.split('=');
                    switch (name.trim()) {
                        case 'characterId':
                            characterIdCharacters = value;
                            console.log('characterId: ' + characterIdCharacters);
                            break;
                        case 'selectedGame':
                            selectedGameCharacters = value;
                            console.log('selectedGame: ' + selectedGameCharacters);
                            break;
                        case 'characterCreated':
                            characterCreatedCharacters = value;
                            console.log('characterCreated: ' + characterCreatedCharacters);
                            break;
                        case 'characterCreatedForGame':
                            characterCreatedForGameCharacters = value;
                            console.log('characterCreatedForGame: ' + characterCreatedForGameCharacters);
                            break;
                        default:
                            break;
                    }
                });
            });

                window.location.href = href;

        });
    })


}

const getCharacters = () => {
    return axios.get(`${baseURL}`)
        .then(res => {
            const data = res.data;
            return data;
        })
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error("Server responded with error status:", error.response.status);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received from server:", error.request);
            } else {
                // Something else happened while setting up the request
                console.error("Error setting up request:", error.message);
            }
            throw error;
        });
}

const fetchCharacters = () => {
    getCharacters().then(characters => {
        // console.log(characters); // This will log the resolved value of the promise

        allCharacters(characters[0])
    });
}

const menuClicked = (event) => {
    event.preventDefault()
    console.log('menu clicked')
    sideNav.style.width = "250px"
}

const characterCreationClicked = () => {
    sideNav.style.width = "0"

    const selectedGame = -1;
    const characterId = -1;
    const characterCreated = false;
    const characterCreatedForGame = false;
        
            // Set cookies
            document.cookie = `characterId=${characterId}`
            document.cookie = `selectedGame=${selectedGame}`
            document.cookie = `characterCreated=${characterCreated}`
            document.cookie = `characterCreatedForGame=${characterCreatedForGame}`
}

const closeButton = () => {
    sideNav.style.width = "0"
}

menuIcon.addEventListener('click', menuClicked);

characterCreationLink.addEventListener('click', characterCreationClicked)

closeBtn.addEventListener('click', closeButton())

fetchCharacters()