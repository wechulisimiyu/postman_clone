import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const queryParamsContainer = document.querySelector("[data-query-params]")
const requestHeadersContainer = document.querySelector("[data-request-headers]")
const keyValueTemplate = document.querySelector("[data-key-value-template]")

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

FormData.addEventListener('submit', e => {
    e.preventDefault()

    axios({
    url: document.querySelector('data-url').value,
    method: document.querySelector('data-method').value,
    params: keyValuePairsToObjects(queryParamsContainer),
    headers: keyValuePairsToObjects(requestHeadersContainer),
    data,
    })
})