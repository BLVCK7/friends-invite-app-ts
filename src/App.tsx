import React from 'react';
import Success from './components/Success';
import { Users } from './components/Users';
import './index.scss';

export interface Data {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

function App() {
  const [data, setData] = React.useState<Data[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [search, setSearch] = React.useState('');
  const [invites, setInvites] = React.useState<number[]>([]);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((response) => setData(response.data))
      .finally(() => setLoading(false));
  }, []);

  const onClickInvite = (id: number): void => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id: number) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = (): void => {
    setSuccess(true);
  };

  return (
    <div className="app">
      {success ? (
        <Success invites={invites} />
      ) : (
        <Users
          search={search}
          setSearch={setSearch}
          isLoading={isLoading}
          data={data}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
