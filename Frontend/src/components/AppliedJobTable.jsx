import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
            <Table className="w-full text-sm">
                <TableCaption className="text-gray-500 mt-2">A list of your applied jobs</TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="px-6 py-3 text-left text-gray-700">Date</TableHead>
                        <TableHead className="px-6 py-3 text-left text-gray-700">Job Role</TableHead>
                        <TableHead className="px-6 py-3 text-left text-gray-700">Company</TableHead>
                        <TableHead className="px-6 py-3 text-right text-gray-700">Status</TableHead>
                    </TableRow>
                </TableHeader>

                {allAppliedJobs && allAppliedJobs.length > 0 ? (
                    <TableBody>
                        {allAppliedJobs.map((appliedJob, index) => (
                            <TableRow key={appliedJob?._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                <TableCell className="px-6 py-4">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="px-6 py-4 font-medium text-gray-800">{appliedJob?.job?.title || "N/A"}</TableCell>
                                <TableCell className="px-6 py-4 text-gray-700">{appliedJob?.job?.company?.name || "N/A"}</TableCell>
                                <TableCell className="px-6 py-4 text-right">
                                    <Badge
                                        className={`px-3 py-1 text-xs font-semibold uppercase rounded-full ${
                                            appliedJob?.status === "rejected"
                                                ? 'bg-red-100 text-red-600 border border-red-400'
                                                : appliedJob?.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-600 border border-yellow-400'
                                                : 'bg-green-100 text-green-600 border border-green-400'
                                        }`}
                                    >
                                        {appliedJob?.status?.toUpperCase() || "UNKNOWN"}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan="4" className="text-center text-gray-500 p-6">
                                <p className="text-lg font-medium">You haven't applied for any jobs yet.</p>
                                <p className="text-sm">Start applying to see your applications here.</p>
                            </td>
                        </tr>
                    </tbody>
                )}
            </Table>
        </div>
    );
};

export default AppliedJobTable;



