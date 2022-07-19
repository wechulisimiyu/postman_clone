import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"

const form = document.querySelector("[data-form]")
const queryParamsContainer = document.querySelector("[data-query-params]")
const requestHeadersContainer = document.querySelector("[data-request-headers]")
const keyValueTemplate = document.querySelector("[data-key-value-template]")
const responseHeadersContainer = document.querySelector("[data-response-headers]")

document.querySelector("[data-add-query-param-btn]").addEventListener("click", () => {
    queryParamsContainer.append(createKeyValuePair())
}) // add button creates key value pairs below existing ones in query params

document.querySelector("[data-add-request-header-btn]").addEventListener("click", () => {
    requestHeadersContainer.append(createKeyValuePair())
}) // add button creates key value pairs below existing ones in request header

const createKeyValuePair = () => {
    const element = keyValueTemplate.content.cloneNode(true)
    element.querySelector("[data-remove-btn]").addEventListener("click", e => {
        e.target.closest("[data-key-value-pair]").remove(); // listen for button click and remove the key value pair
    })
    return element;
}

queryParamsContainer.append(createKeyValuePair())
requestHeadersContainer.append(createKeyValuePair())

form.addEventListener('submit', e => {
    e.preventDefault()

    axios({
    url: document.querySelector("[data-url]").value,
    method: document.querySelector("[data-method]").value,
    params: keyValuePairsToObjects(queryParamsContainer),
    headers: keyValuePairsToObjects(requestHeadersContainer)
    }).then(response => {
        document.querySelector("[data-response-section]")
        .classList.remove("d-none")
        // updateResponseDetails(response)
        // updateResponseEditor(response.data)
        updateResponseHeaders(response.headers)
        console.log(response)
    })
})

function updateResponseHeaders (headers) {
    responseHeadersContainer.innerHTML = "";
    Object.entries(headers).forEach(([key, value]) => {
            const keyElement = document.createElement('div')
            keyElement.textContent = key
            responseHeadersContainer.append(key)
        })
}

function keyValuePairsToObjects(container)  {
    const pairs = container.querySelectorAll('[data-key-value-pair]')
    return [...pairs].reduce((data, pair) => {
        const key = pair.querySelector('[data-key]').value
        const value = pair.querySelector('[data-key]').value

        if (key === '') return data //if empty string
        return {...data, [key]: value} //add it into the existing data
    }, {})
}