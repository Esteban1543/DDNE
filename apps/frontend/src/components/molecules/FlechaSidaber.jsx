import '../../assets/styles/Sidebar.css';

function FlechaSidebar({ isOpen, toogle }) {
  return (
    <div className="flecha-sidebar" onClick={()=>toogle(true)}>
      {!isOpen ? (
        <>
          <div className="flecha-sidebar_rows flecha-sidebar_rows_row1_close" />
          <div className="flecha-sidebar_rows flecha-sidebar_rows_row2_close" />
        </>
      ) : (
        <>
          <div className="flecha-sidebar_rows flecha-sidebar_rows_row1_open"/>
          <div className="flecha-sidebar_rows flecha-sidebar_rows_row2_open"/>
        </>
      )}
    </div>
  );
}

export default FlechaSidebar;