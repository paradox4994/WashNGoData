import {React, useState} from "react";
import { useReactTable } from "@tanstack/react-table";

export default function TableComp() {

    const [data,setData] = useState(DATA)

    const table = useReactTable({
        data,
        columns,
    })
  return <div></div>;
}
