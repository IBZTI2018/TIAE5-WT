import { Users } from '../api/user';

function UserSettingsPage() {
    return (
        <div>
            <h2 className="mt-5">Benutzereinstellungen: </h2>
            <Users />
        </div>
    );
}
export default UserSettingsPage