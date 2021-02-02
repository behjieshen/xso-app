/**
 * @summary - To check if user is authenticated with a specific role
 * @param {object} - Request object
 * @param {string} - Role ('NEW USER' || 'ADMIN' || 'STUDENT' || 'APPLICANT')
 * @returns {boolean}
 */


import { getSession } from "next-auth/client";
export const isAuthenticated = async (req, role) => {
    const session = await getSession({ req });

    console.log(session);

    if (!session || (session != null && session.dbUser.role !== role)) {
        return false
    }  

    return true;
}