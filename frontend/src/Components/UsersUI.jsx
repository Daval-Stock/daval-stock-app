import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsersUI() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/users/all-user')
            .then(response => {
                setUsers(response.data);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        
    <div class="items-center justify-between pt-10 m-10">
		<div className="pb-10">
			<h2 class="text-gray-600 font-semibold">Listes des utilisateurs</h2>
			<span class="text-sm">L'ensemble des employés de la pharmacie de la Paix</span>
		</div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/*<h1 className="text-center pt-4 pb-6">La liste complète des employés de la pharmarcie de la paix</h1>*/}
            <table className="w-full text-left text-textColor dark:bg-gray-800 dark:text-white">
                <thead className="bg-red-200 text-lg">
                    <tr>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                        Prénom et Nom
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        N° Téléphone
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Rôle
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {users.map(user => (

                    <tr className="px-6 py-4"
                    key={user._id}>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.mobile}</td>
                        <td className="px-6 py-4">{user.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default UsersUI;