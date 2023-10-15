"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeModal = exports.showModal = void 0;
var modalInitialized = false;
var APIENDPOINT = "https://api.dev.behidn.com/api/v1/subscribers/request-subscription";
var api = "";
// Append modal HTML to body
function initModal(_a) {
    var documentReference = _a.documentReference, _b = _a.title, title = _b === void 0 ? "Join the News Letter!" : _b, _c = _a.description, description = _c === void 0 ? "Subscribe to get latest content by email and stay updated" : _c, _d = _a.buttonText, buttonText = _d === void 0 ? "Subscribe" : _d, imageUrl = _a.imageUrl, _e = _a.buttonColor, buttonColor = _e === void 0 ? "#3B82F6" : _e, _f = _a.buttonHoverColor, buttonHoverColor = _f === void 0 ? "#2563EB" : _f, _g = _a.bgColor, bgColor = _g === void 0 ? "#FFFFFF" : _g, _h = _a.titleColor, titleColor = _h === void 0 ? "#000" : _h, // Default black
    _j = _a.titleAlignment, // Default black
    titleAlignment = _j === void 0 ? "center" : _j, // Default center
    _k = _a.titleSize, // Default center
    titleSize = _k === void 0 ? "2xl" : _k, // Default size
    _l = _a.descColor, // Default size
    descColor = _l === void 0 ? "#777777" : _l, // Default gray
    _m = _a.descAlignment, // Default gray
    descAlignment = _m === void 0 ? "center" : _m, // Default center
    _o = _a.descSize, // Default center
    descSize = _o === void 0 ? "lg" : _o, // Default size
    _p = _a.placeHolderText, // Default size
    placeHolderText = _p === void 0 ? "Your email" : _p, apiKey = _a.apiKey;
    if (modalInitialized)
        return;
    documentReference.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    if (!apiKey) {
        console.error("API key is required to kick start.");
        return;
    }
    api = apiKey;
    var modalHTML = "\n        <div class=\"modal-content rounded-lg p-6 max-w-sm mx-auto relative shadow-2xl flex flex-col items-center text-center\" style=\"background-color: ".concat(bgColor, ";\">\n            <span class=\"close-btn absolute top-3 right-3 text-gray-500 cursor-pointer\">&times;</span>\n\n            <div class=\"mb-4\">\n                <img src=\"").concat(imageUrl, "\" alt=\"Logo\" class=\"w-48\">\n            </div>\n\n            <h2 class=\"text-").concat(titleSize, " mb-4 text-").concat(titleAlignment, "\" style=\"color: ").concat(titleColor, ";\">").concat(title, "</h2>\n            <p class=\"text-").concat(descSize, " mb-4 text-").concat(descAlignment, "\" style=\"color: ").concat(descColor, ";\">").concat(description, "</p>\n            <form action=\"#\" method=\"post\" class=\"space-y-3 w-full\">\n                <input type=\"text\" name=\"email\" placeholder=\"").concat(placeHolderText, "\" class=\"w-full p-2 border border-gray-300 rounded-md mt-2\" required>\n                <div class=\"flex items-center text-xs\">\n                    <input type=\"checkbox\" name=\"non-eu-citizen\" id=\"non-eu-citizen\" checked class=\"mr-1 h-3 w-3\">\n                    <label for=\"non-eu-citizen\" class=\"text-gray-600\">Non-EU Citizen</label>\n                </div>\n                <input type=\"submit\" value=\"").concat(buttonText, "\" style=\"background-color: ").concat(buttonColor, "; transition: background-color 0.3s;\" onmouseover=\"this.style.backgroundColor='").concat(buttonHoverColor, "'\" onmouseout=\"this.style.backgroundColor='").concat(buttonColor, "'\" class=\"w-full py-2 text-white rounded-md focus:outline-none mt-2\">\n            </form>\n            <a href=\"https://behidn.com\" target=\"_blank\" rel=\"noopener noreferrer\" title=\"Powered by BeHind\" class=\"mt-3 text-gray-500 text-xs hover:underline\">Protected by Zero-Knowledge Proof</a>\n        </div>\n    ");
    var modal = documentReference.createElement('div');
    modal.className = "modal fixed inset-0 flex items-center justify-center h-screen w-full hidden";
    modal.id = "myModal";
    modal.innerHTML = modalHTML;
    documentReference.body.appendChild(modal);
    var closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', closeModal);
    modalInitialized = true;
    var form = modal.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (event) {
            handleSubmitForm(event, documentReference);
        });
    }
}
function handleSubmitForm(event, documentReference) {
    event.preventDefault();
    var emailInput = documentReference.querySelector("input[name='email']");
    var checkboxInput = documentReference.querySelector("input[name='non-eu-citizen']");
    if (emailInput) {
        var email = emailInput.value;
        var isNonEuCitizen = checkboxInput ? checkboxInput.checked : false;
        // console.log("email_id: ", email);
        // console.log("regulation: ", isNonEuCitizen);
        // console.log("api_key: ", api);
        var payload = {
            email_id: email,
            regulation: isNonEuCitizen === true ? 'eu' : 'non-eu',
            api_key: api
        };
        fetch(APIENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (data.status === true) {
                console.log('Success:', data);
                closeModal();
            }
            else {
                console.error('Error:', data);
            }
        })
            .catch(function (error) {
            console.error('Error:', error);
        });
    }
}
function showModal(config) {
    if (config === void 0) { config = {}; }
    if (!modalInitialized) {
        initModal(__assign(__assign({}, config), { documentReference: document }));
    }
    var modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}
exports.showModal = showModal;
function closeModal() {
    var modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'none';
    }
}
exports.closeModal = closeModal;
