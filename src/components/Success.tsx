type Props = {
  invites: number[];
};

const Success = ({ invites }: Props) => {
  return (
    <div className="success-block">
      <h3>Успешно!</h3>
      <p>Всем {invites.length} пользователям отправлено приглашение.</p>
      <button className="send-invite-btn" onClick={() => window.location.reload()}>
        Назад
      </button>
    </div>
  );
};

export default Success;
