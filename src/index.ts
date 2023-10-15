let modalInitialized = false;
let APIENDPOINT = "https://api.dev.behidn.com/api/v1/subscribers/request-subscription"
let api = "";

interface ModalConfig {
    documentReference: any,
    title?: string,
    description?: string,
    buttonText?: string,
    imageUrl?: string,
    buttonColor?: string,
    buttonHoverColor?: string,
    bgColor?: string,
    titleColor?: string,
    titleAlignment?: string,
    titleSize?: string,
    descColor?: string,
    descAlignment?: string,
    descSize?: string,
    placeHolderText?: string,
    apiKey?: any
}

// Append modal HTML to body
function initModal({
    documentReference,
    title = "Join the News Letter!",
    description = "Subscribe to get latest content by email and stay updated",
    buttonText = "Subscribe",
    imageUrl,
    buttonColor = "#3B82F6",
    buttonHoverColor = "#2563EB",
    bgColor = "#FFFFFF",
    titleColor = "#000",            // Default black
    titleAlignment = "center",      // Default center
    titleSize = "2xl",              // Default size
    descColor = "#777777",          // Default gray
    descAlignment = "center",       // Default center
    descSize = "lg",                // Default size
    placeHolderText = "Your email",
    apiKey
}: ModalConfig) {
    if (modalInitialized) return;

    documentReference.addEventListener('keydown', function (event: KeyboardEvent) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    if (!apiKey) {
        console.error("API key is required to kick start.");
        return;
    }

    api = apiKey;

    const modalHTML = `
        <div class="modal-content rounded-lg p-6 max-w-sm mx-auto relative shadow-2xl flex flex-col items-center text-center" style="background-color: ${bgColor};">
            <span class="close-btn absolute top-3 right-3 text-gray-500 cursor-pointer">&times;</span>

            <div class="mb-4">
                <img src="${imageUrl}" alt="Logo" class="w-48">
            </div>

            <h2 class="text-${titleSize} mb-4 text-${titleAlignment}" style="color: ${titleColor};">${title}</h2>
            <p class="text-${descSize} mb-4 text-${descAlignment}" style="color: ${descColor};">${description}</p>
            <form action="#" method="post" class="space-y-3 w-full">
                <input type="text" name="email" placeholder="${placeHolderText}" class="w-full p-2 border border-gray-300 rounded-md mt-2" required>
                <div class="flex items-center text-xs">
                    <input type="checkbox" name="non-eu-citizen" id="non-eu-citizen" checked class="mr-1 h-3 w-3">
                    <label for="non-eu-citizen" class="text-gray-600">Non-EU Citizen</label>
                </div>
                <input type="submit" value="${buttonText}" style="background-color: ${buttonColor}; transition: background-color 0.3s;" onmouseover="this.style.backgroundColor='${buttonHoverColor}'" onmouseout="this.style.backgroundColor='${buttonColor}'" class="w-full py-2 text-white rounded-md focus:outline-none mt-2">
            </form>
            <a href="https://behidn.com" target="_blank" rel="noopener noreferrer" title="Powered by BeHind" class="mt-3 text-gray-500 text-xs hover:underline">Protected by Zero-Knowledge Proof</a>
        </div>
    `;

    const modal = documentReference.createElement('div');
    modal.className = "modal fixed inset-0 flex items-center justify-center h-screen w-full hidden";
    modal.id = "myModal";
    modal.innerHTML = modalHTML;

    documentReference.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', closeModal);

    modalInitialized = true;

    const form = modal.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (event: any) {
            handleSubmitForm(event, documentReference);
        });
    }
}

function handleSubmitForm(event: Event, documentReference: Document) {
    event.preventDefault();

    const emailInput = documentReference.querySelector("input[name='email']") as HTMLInputElement;
    const checkboxInput = documentReference.querySelector("input[name='non-eu-citizen']") as HTMLInputElement;

    if (emailInput) {
        const email = emailInput.value;
        const isNonEuCitizen = checkboxInput ? checkboxInput.checked : false;

        // console.log("email_id: ", email);
        // console.log("regulation: ", isNonEuCitizen);
        // console.log("api_key: ", api);

        const payload = {
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
            .then(response => response.json())
            .then(data => {
                if (data.status === true) {
                    console.log('Success:', data);
                    closeModal();
                } else {
                    console.error('Error:', data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function showModal(config: Partial<ModalConfig> = {}) {
    if (!modalInitialized) {
        initModal({ ...config, documentReference: document });
    }

    const modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

export {
    showModal,
    closeModal
};
