let searchInput = document.getElementById("search-input");
let searchForm = document.getElementById("search-form");
let resultsContainer = document.getElementById("formula1-results");
let ul = document.createElement("ul");
resultsContainer.append(ul);

searchForm.addEventListener("submit", see);

function see(e) {

    e.preventDefault();
    resultsContainer.querySelectorAll("h2").forEach(h2 => h2.remove());

    let result = searchInput.value.toLowerCase().trim();
    ul.innerHTML = "";

    try {

        if (!["drivers", "teams", "age", "titles", "wins", "podiums", "races", "points"].includes(result)) {
            throw new Error ("Nothing found");
        }

        console.log("Successful search");
        
        fetch("f1Drivers.txt")
            .then(converse => converse.json())
            .then(all => {
                
                 if (result === "drivers") {

                    let h2 = document.createElement("h2");
                    h2.textContent = "Drivers";
                    resultsContainer.prepend(h2);

                    for (const driver of all) {

                        let infoDriver = `
                            ${driver.name.toUpperCase()} ${driver.surname.toUpperCase()}
                            ${driver.age} years old
                            Number ${driver.number}
                            ${driver.team}
                            ${driver.titles} titles
                            ${driver.wins} wins
                            ${driver.podiums} podiums
                            ${driver.races} races
                            ${driver.points} points
                        `
                        
                        let li = document.createElement("li");
                        li.style.whiteSpace = "pre-line";
                        li.textContent = infoDriver;
                        li.setAttribute("id", "statistics")
                        ul.setAttribute("id", "ulStatistics");
                        ul.append(li);

                    }

                } else if (result === "teams") {

                    const teams = ["Mclaren Formula 1 Team", "Mercedes AMG Petronas Formula One Team", "Oracle Red Bull Racing", "Scuderia Ferrari", "Atlassian Williams F1 Team", "Visa Cash App Racing Bulls Formula One Team", "Aston Martin Aramco Formula One Team", "TGR Haas F1 Team", "Audi Revolut F1 Team", "BWT Alpine Formula One Team", "Cadillac Formula 1 Team"];
                    
                    let h2 = document.createElement("h2");
                    h2.textContent = "Teams";
                    resultsContainer.prepend(h2);

                    for (const team of teams) {

                        let infoTeam = `${team}`;
                        let li = document.createElement("li");
                        li.style.whiteSpace = "pre-line";
                        li.textContent = infoTeam;
                        ul.setAttribute("id", "ulTeams");
                        li.setAttribute("id", "nameTeams");
                        ul.append(li);

                    }

                } else if (result === "races") {

                    let h2 = document.createElement("h2");
                    h2.textContent = "Drivers with most races";
                    resultsContainer.prepend(h2);

                    all.sort((a, b) => b.races - a.races);

                    for (const mostRaces of all) {
                        
                        let li = document.createElement("li");
                        li.style.whiteSpace = "pre-line";
                        li.textContent = `${mostRaces.races} - ${mostRaces.name} ${mostRaces.surname}`;
                        ul.setAttribute("id", "ulRaces");
                        li.setAttribute("id", "driverRaces");
                        ul.append(li);
                    }

                } else if (result === "wins") {

                    let h2 = document.createElement("h2");
                    h2.textContent = "Drivers with most wins";
                    resultsContainer.prepend(h2);

                    all.sort((a, b) => b.wins - a.wins);

                    for (const mostWins of all) {

                        if (mostWins.wins >= 1) {

                            let li = document.createElement("li");
                            li.style.whiteSpace = "pre-line";
                            li.textContent = `${mostWins.wins} - ${mostWins.name} ${mostWins.surname}`;
                            ul.setAttribute("id", "ulWinners");
                            li.setAttribute("id", "raceWinners");
                            ul.append(li);

                        }

                    }
                } else if (result === "titles") {

                    let h2 = document.createElement("h2");
                    h2.textContent = "Drivers with most titles";
                    resultsContainer.prepend(h2);

                    all.sort((a, b) => b.titles - a.titles);

                    for (const worldChampion of all) {

                        if (worldChampion.titles >= 1) {

                            let li = document.createElement("li");
                            li.style.whiteSpace = "pre-line";
                            li.textContent = `${worldChampion.titles} - ${worldChampion.name} ${worldChampion.surname}`;
                            ul.append(li);
                        }

                    }
                } else if (result === "podiums") {

                    let h2 = document.createElement("h2");
                    h2.textContent = "Drivers with most podiums";
                    resultsContainer.prepend(h2);

                    all.sort((a, b) => b.podiums - a.podiums);

                    for (const mostPodiums of all) {

                        if (mostPodiums.podiums >= 1) {

                            let li = document.createElement("li");
                            li.textContent = `${mostPodiums.podiums} - ${mostPodiums.name} ${mostPodiums.surname}`;
                            li.style.whiteSpace = "pre-line";
                            ul.append(li);

                        }

                    }

                } else if (result === "points") {
                    
                    let h2 = document.createElement("h2");
                    h2.textContent = "Drivers with most points";
                    resultsContainer.prepend(h2);

                    all.sort((a, b) => b.points - a.points);

                    for (const mostPoints of all) {

                        if (mostPoints.points >= 1) {

                            let li = document.createElement("li");
                            li.textContent = `${mostPoints.points} - ${mostPoints.name} ${mostPoints.surname}`;
                            li.style.whiteSpace = "pre-line";
                            ul.append(li);

                        }

                    }

                } else if (result === "age") {

                    let h2 = document.createElement("h2");
                    h2.textContent = "Oldest to youngest driver";
                    resultsContainer.prepend(h2);

                    all.sort((a, b) => b.age - a.age);

                    for (const driverAge of all) {

                        let li = document.createElement("li");
                        li.textContent = `${driverAge.age} years old - ${driverAge.name} ${driverAge.surname}`;
                        li.style.whiteSpace = "pre-line";
                        ul.append(li);

                    }

                } 

            })

} catch (error) {

        ul.innerHTML = "";
        let li = document.createElement("li");
        li.textContent = "Search incorrect";
        console.log("Unsuccessful search");
        ul.append(li);
        
    }

}