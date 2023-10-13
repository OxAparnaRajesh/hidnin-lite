interface ModalConfig {
    documentReference: any;
    title?: string;
    description?: string;
    buttonText?: string;
    imageUrl?: string;
    buttonColor?: string;
    buttonHoverColor?: string;
    bgColor?: string;
    titleColor?: string;
    titleAlignment?: string;
    titleSize?: string;
    descColor?: string;
    descAlignment?: string;
    descSize?: string;
    placeHolderText?: string;
    apiKey?: any;
}
declare function showModal(config?: Partial<ModalConfig>): void;
declare function closeModal(): void;
export { showModal, closeModal };
