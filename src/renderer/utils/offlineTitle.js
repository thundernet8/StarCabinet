const offlineTitle = (offline) => {
    if (offline) {
        document.title += ' (offline)'
    } else {
        let title = document.title
        document.title = title.replace(' (offline)', '')
    }
}

export default offlineTitle
