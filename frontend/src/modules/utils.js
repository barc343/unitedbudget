export const getDataFromFormRef = (form_ref) => {
    let data = {}
    const formData = new FormData(form_ref.current);
    for (let [key, value] of formData.entries()) {
        data[key] = value
    }
    return data
}

export const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}