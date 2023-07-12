export const SipsTea = ({ clearChat }) => {
  return (
    <aside className="sideMenu">
      <div className="sideMenuButton" onClick={clearChat}>
        <span>+</span>
        Spill the tea?
      </div>
    </aside>
  );
};
