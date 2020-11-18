import React, { useEffect, useState } from "react";
import LogItems from "./LogItems";
import Preloader from "../Layouts/Preloader";

const Logs = () => {
  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);
  const getLogs = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/logs");
    const data = await res.json();
    // console("data");
    setLogs(data);
    setLoading(false);
  };
  if (loading) {
    return <Preloader />;
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className="center"> No Log to show...</p>
      ) : (
        logs.map((log) => <LogItems log={log} key={log.id} />)
      )}
    </ul>
  );
};

export default Logs;