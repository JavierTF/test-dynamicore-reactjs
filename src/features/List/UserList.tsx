import { useState, useEffect } from 'react';
import { TUser } from '../../types/users.type';
import ListComponent from './ListComponent';
import useFetchUsers from '../../hooks/useFetchUsers';

interface UserListProps {
  text: any;
}

const UserList = ({ text }: UserListProps) => {
  const [sortedUsers, setSortedUsers] = useState<TUser[]>([]);
  const [asc, setAsc] = useState<boolean>(true);
  const { data: users, isLoading, error } = useFetchUsers(500);
  const textList = text?.list;
  const textCommon = text?.common;

  useEffect(() => {
    if (users && users.length) {
      const sorted = [...users].sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return asc ? comparison : -comparison;
      });
      setSortedUsers(sorted);
    }
  }, [users, asc]);

  const toggleOrder = () => {
    setAsc(prevAsc => !prevAsc);
  }

  const errorOrList = () => {
    return error ? textCommon?.genericError : <ListComponent sortedUsers={sortedUsers} asc={asc} toggleOrder={toggleOrder} text={text} />;
  }

  return (
    <div style={{ maxWidth: "350px", margin: "0 auto" }}>
      {isLoading ? textList?.loading : errorOrList()}
    </div>
  );
};

export default UserList;