import Editor from "./editor";
import Navbar from "./navbar";
import { Room } from "./room";
import ToolBar from "./toolbar";

interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
    const { documentId } = await (params);

    return (
        <div className="min-h-screen bg-[#FAFBFD]">

            <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden">
                <Navbar />
                <ToolBar />
            </div>

            <div className="pt-[144px] mt-2 print:pt-0 print:mt-0"> {/* og div style = pt-[114px] print:pt-0*/}
                <Room>
                    <Editor />
                </Room>
            </div>

        </div>
    )
}
export default DocumentIdPage