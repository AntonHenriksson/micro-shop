
export const checkUserAuth = () => {
    const token = localStorage.getItem("token")
    return token !== null
}

export const getUserEmailFromToken = () => {
    const token = localStorage.getItem("token")
    if (!token) return null

    try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        return payload.email
    } catch (error) {
        console.error("Error decoding token:", error)
        return null
    }
}   