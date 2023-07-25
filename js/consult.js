const searchConsult = document.getElementById("search-consult")
const table = document.getElementById("table")

searchConsult.addEventListener("submit", async event => {
    event.preventDefault();
    try {
        const value = searchConsult.querySelector("input").value;
        if (value.length === 0) return;
        const onlyNumbers = new RegExp('^[0-9]+$');
        if (!onlyNumbers.test(value)) return;
        const code = value.replace(/^0+/, "");
        const result = await axios.get("https://patrimonio-l5e1.onrender.com/properties", {
            params: {
                code: code
            }
        })

        if (result.status === 200) {
            table.classList.remove("close")
            result.data.map(({ registration, description, room }) => {
                const tr = document.createElement("tr")
                tr.innerHTML = `
                    <td>${registration}</td>
                    <td>${description}</td>
                    <td>${room}</td>
                `
                return tr
            }).map(item => {
                table.appendChild(item)
            })
        }
        
        if (result.status === 209) {
            const div = document.createElement("div");
            div.classList.add("c-alert");
            div.classList.add("c-alert--warning");
            div.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#28292B"/>
                    <path d="M12 13.75C12.41 13.75 12.75 13.41 12.75 13V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V13C11.25 13.41 11.59 13.75 12 13.75Z" fill="#28292B"/>
                    <path d="M12.92 15.6199C12.87 15.4999 12.8 15.3899 12.71 15.2899C12.61 15.1999 12.5 15.1299 12.38 15.0799C12.14 14.9799 11.86 14.9799 11.62 15.0799C11.5 15.1299 11.39 15.1999 11.29 15.2899C11.2 15.3899 11.13 15.4999 11.08 15.6199C11.03 15.7399 11 15.8699 11 15.9999C11 16.1299 11.03 16.2599 11.08 16.3799C11.13 16.5099 11.2 16.6099 11.29 16.7099C11.39 16.7999 11.5 16.8699 11.62 16.9199C11.74 16.9699 11.87 16.9999 12 16.9999C12.13 16.9999 12.26 16.9699 12.38 16.9199C12.5 16.8699 12.61 16.7999 12.71 16.7099C12.8 16.6099 12.87 16.5099 12.92 16.3799C12.97 16.2599 13 16.1299 13 15.9999C13 15.8699 12.97 15.7399 12.92 15.6199Z" fill="#28292B"/>
                </svg>            
                Nada encontrado
            `
            searchConsult.after(div);
            setTimeout(() => {
                div.remove()
            }, 5000)
        }
    } catch (error) {
    }
});
