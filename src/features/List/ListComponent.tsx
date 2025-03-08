import { TUser } from '../../types/users.type';

type UserListProps = {
    sortedUsers: TUser[];
    asc: boolean;
    toggleOrder: () => void;
    text: any;
}

const ListComponent = ({ sortedUsers, asc, toggleOrder, text }: UserListProps) => {
    const textList = text?.list;

    return (
        <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #e9ecef' }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#343a40', paddingRight: 5 }}>{textList?.header}</h2>
                <button
                    onClick={toggleOrder}
                    style={{
                        backgroundColor: '#4dabf7',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {textList?.order} {asc ? textList?.asc : textList?.desc}
                    <span style={{ fontWeight: 'bold', marginLeft: '4px' }}>
                        {asc ? " ↑" : " ↓"}
                    </span>
                </button>
            </div>

            {!!sortedUsers && sortedUsers.length > 0 ? (
                <ol style={{ listStylePosition: 'inside', paddingLeft: 0, margin: 0 }}>
                    {sortedUsers.map((user, index) => (
                        <li key={index} style={{ padding: '0.75rem 0.5rem', borderBottom: index < sortedUsers.length - 1 ? '1px solid #e9ecef' : 'none' }}>
                            {user.name} ({user.age} años)
                        </li>
                    ))}
                </ol>
            ) : (
                <div style={{ padding: '2rem 0', textAlign: 'center', color: '#868e96', fontStyle: 'italic' }}>
                    {textList?.noUsers}
                </div>
            )}
        </div>
    );
};

export default ListComponent;