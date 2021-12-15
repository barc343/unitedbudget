export const getDataFromFormRef = (form_ref) => {
    let data = {}
    const formData = new FormData(form_ref.current);
    for (let [key, value] of formData.entries()) {
        data[key] = value
    }
    return data
}