import {React, useState} from "react";
import { useReactTable } from "@tanstack/react-table";

const columns = [
  {
     ascessorKey: 'task',
     header: "task",
  }
]

export default function TableComp() {

    const [data,setData] = useState()

    const table = useReactTable({
      data,
      columns,
    })
  return <div></div>;
}
