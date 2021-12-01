import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import { accounts } from "../context/AccountContext";
import UserContext from "../context/UserContext";
import AccountContext from "../context/AccountContext";

export default function AllData() {
  const { accounts } = useContext(AccountContext);
  return (
    <div class="card">
      <div class="card-header">All data</div>

      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>

            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance $</th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((element, i) => {
            return (
              <tr key={i}>
                <td># {i + 1}</td>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td>{element.password}</td>
                <td>{element.balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div class="card-footer">Card Footer</div>
    </div>
  );
}
