import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";

import DocumentMeta from "react-document-meta";
import Layout from "../templates";

import { connect } from "react-redux";
import { logoutUser } from "../store/actions";

function Dashboard(props) {
  const { logoutUser, user, isLogin } = props;
  const history = useHistory();

  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
    }
  }, [isLogin, history]);

  const handleLogout = () => {
    logoutUser(user.token);
  };

  const meta = {
    title: `${process.env.REACT_APP_BRAND} - Your Web Solution`,
    description: `${process.env.REACT_APP_BRAND} is the solution for all your needs`,
    meta: {
      name: {
        robots: "follow,index",
        keywords: "simple, fast, reliable",
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <Layout>
        <div className="content">
          Welcome {`${user.name}`}!<br />
          <br />
          <input type="button" onClick={handleLogout} value="Logout" />
        </div>
      </Layout>
    </DocumentMeta>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.usrReducer.user,
    isLogin: state.usrReducer.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: (token) => dispatch(logoutUser(token)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
