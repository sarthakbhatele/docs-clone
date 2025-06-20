'use client';

import { type ColorResult, SketchPicker } from 'react-color'
import { type Level } from '@tiptap/extension-heading'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import useEditorStore from "@/store/use-editor-store";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, ChevronDown, HighlighterIcon, ImageIcon, Italic, Link2, ListCollapseIcon, ListIcon, ListOrderedIcon, ListTodo, LucideIcon, MessageSquarePlus, Minus, Plus, PrinterIcon, Redo2Icon, RemoveFormatting, SearchIcon, SpellCheckIcon, Underline, Undo2Icon, UploadIcon } from "lucide-react";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';


// fn for fonts
const FontFamilyButton = () => {
    const { editor } = useEditorStore();

    const fonts = [
        { label: "Arial", value: "Arial" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Georgia", value: "Georgia" },
        { label: "Verdana", value: "Verdana" },
        { label: "Trebuchet MS", value: "Trebuchet MS" },
        { label: "Tahoma", value: "Tahoma" },
        { label: "Courier New", value: "Courier New" },
        { label: "Lucida Console", value: "Lucida Console" },
        { label: "Palatino Linotype", value: "Palatino Linotype" },
        { label: "Impact", value: "Impact" },
        // { label: "Roboto", value: "Roboto" },
        // { label: "Oswald", value: "Oswald" },
        // { label: "Exo 2", value: "Exo 2" },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-300/80 px-1.5 overflow-hidden text-sm">
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDown className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col">
                {fonts.map(({ label, value }) => (
                    <button
                        onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                        key={value}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-300/80",
                            editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-300/80"
                        )}
                        style={{ fontFamily: value }}
                    >
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu >
    )
}

// fn for heading styles
const HeadingLevelButton = () => {
    const { editor } = useEditorStore();

    const headings = [
        { label: "Normal text", value: 0, fontSize: "16px" },
        { label: "Heading 1", value: 1, fontSize: "32px" },
        { label: "Heading 2", value: 2, fontSize: "24px" },
        { label: "Heading 3", value: 3, fontSize: "20px" },
        { label: "Heading 4", value: 4, fontSize: "18px" },
    ]

    const getCurrentHeading = () => {
        for (let level = 1; level <= 5; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`
            }
        }

        return "Normal text"
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-300/80 px-1.5 overflow-hidden text-sm">
                    <span className="truncate">
                        {getCurrentHeading()}
                    </span>
                    <ChevronDown className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {headings.map(({ label, value, fontSize }) => (
                    <button
                        onClick={() => {
                            if (value === 0) {
                                editor?.chain().focus().setParagraph().run();
                            }
                            else {
                                editor?.chain().focus().toggleHeading({ level: value as Level }).run()
                            }
                        }}
                        key={value}
                        style={{ fontSize }}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-300/80",
                            (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { level: value }) && "bg-neutral-300/80"
                        )}
                    >
                        {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// fn for text colors
const TextColorButton = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes("textStyle").color || '#000000';

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/80 px-1.5 overflow-hidden text-sm">
                    <span className="text-sm">A</span>
                    <div className='h-0.5 w-full' style={{ backgroundColor: value }} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-0'>
                <SketchPicker
                    color={value}
                    onChange={onChange}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// for highlights
const HighlightColorButton = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes("highlight").color || '#000000'

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/80 px-1.5 overflow-hidden text-sm">
                    <HighlighterIcon className='size-4' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-0'>
                <SketchPicker
                    color={value}
                    onChange={onChange}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// for giving link 
const LinkButton = () => {
    const { editor } = useEditorStore();
    const [value, setValue] = useState("");

    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
        setValue("");

    }

    return (
        <DropdownMenu
            onOpenChange={(open) => {
                if (open) {
                    setValue(editor?.getAttributes("link").href || "")
                }
            }}
        >
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/80 px-1.5 overflow-hidden text-sm">
                    <Link2 className='size-4' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
                <Input
                    placeholder='https://example.com'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button onClick={() => onChange(value)}>
                    Apply
                </Button>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// for image
const ImageButton = () => {
    const { editor } = useEditorStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();
        setImageUrl("");
    }

    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*"

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file)
                onChange(imageUrl)
            }
        }

        input.click();
    }

    const handleImageUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/80 px-1.5 overflow-hidden text-sm">
                        <ImageIcon className='size-4' />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className='size-4 mr-2 ' />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className='size-4 mr-2 ' />
                        Paste image URL
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert image URL</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder='Insert image URL'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleImageUrlSubmit();
                            }
                        }}
                    />
                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}>
                            Insert
                        </Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </>
    )
}

// text alignment fn
const AlignButton = () => {
    const { editor } = useEditorStore();
    const alignments = [
        {
            label: "Align Left",
            value: "left",
            icon: AlignLeft,
        },
        {
            label: "Align Center",
            value: "center",
            icon: AlignCenter,
        },
        {
            label: "Align Right",
            value: "right",
            icon: AlignRight,
        },
        {
            label: "Align Justify",
            value: "justify",
            icon: AlignJustify,
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/80 px-1.5 overflow-hidden text-sm">
                    <AlignLeft className='size-4' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {alignments.map(({ label, value, icon: Icon }) => (
                    <button
                        key={value}
                        onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-300/80",
                            editor?.isActive({ textAlign: value }) && "bg-neutral-300/80"
                        )}
                    >
                        <Icon className='size-4' />
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// lists fn
const ListButton = () => {
    const { editor } = useEditorStore();
    const lists = [
        {
            label: "Bullet List",
            icon: ListIcon,
            isActive: () => editor?.isActive("bulletList"),
            onClick: () => editor?.chain().focus().toggleBulletList().run()
        },
        {
            label: "Ordered List",
            icon: ListOrderedIcon,
            isActive: () => editor?.isActive("orderedList"),
            onClick: () => editor?.chain().focus().toggleOrderedList().run()
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/80 px-1.5 overflow-hidden text-sm">
                    <ListIcon className='size-4' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {lists.map(({ label, icon: Icon, onClick, isActive }) => (
                    <button
                        key={label}
                        onClick={onClick}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-300/80",
                            isActive() && "bg-neutral-300/80"
                        )}
                    >
                        <Icon className='size-4' />
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// font size fn
const FontSizeButton = () => {
    const { editor } = useEditorStore();

    const currentFontSize = editor?.getAttributes("textStyle").fontSize
        ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
        : "16";

    const [FontSize, setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(FontSize);
    const [isEditing, setIsEditing] = useState(false);

    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize);
        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFontSize(newSize)
            setInputValue(newSize)
            setIsEditing(false)
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleInputBlur = () => {
        updateFontSize(inputValue);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands.focus();
        }
    };

    const increment = () => {
        const newSize = parseInt(FontSize) + 1;
        updateFontSize(newSize.toString());
    }

    const decrement = () => {
        const newSize = parseInt(FontSize) - 1;
        if (newSize > 0) {
            updateFontSize(newSize.toString());
        }
    }

    return (
        <div className='flex items-center gap-x-0.5'>
            <button
                onClick={decrement}
                className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-300/80">
                <Minus className='size-4' />
            </button>

            {isEditing ? (
                <input type='text'
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:right-0"
                />
            ) : (
                <button
                    onClick={() => {
                        setIsEditing(true);
                        setFontSize(currentFontSize)
                    }}
                    className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent cursor-text">
                    {currentFontSize}
                </button>
            )}

            <button
                onClick={increment}
                className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-300/80">
                <Plus className='size-4' />
            </button>
        </div>
    )
}

// line-ht fn
const LineHeightButton = () => {
    const { editor } = useEditorStore();
    const lineHeights = [
        {
            label: "Default", value: "normal",
        },
        {
            label: "Single", value: "1",
        },
        {
            label: "1.15", value: "1.15",
        },
        {
            label: "1.5", value: "1.5",
        },
        {
            label: "Double", value: "2",
        },

    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/80 px-1.5 overflow-hidden text-sm">
                    <ListCollapseIcon className='size-4' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {lineHeights.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => editor?.chain().focus().setLineHeight(value).run()}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-300/80",
                            editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-300/80"
                        )}
                    >
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}
const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolbarButtonProps) => {
    return (<button
        onClick={onClick}
        className={cn(
            "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 cursor-pointer",
            isActive && "bg-neutral-400/80"
        )}
    >
        <Icon className="size-4" />
    </button>)
}
const ToolBar = () => {

    const { editor } = useEditorStore();

    // console.log("toolbar ediotr: ",{editor});

    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;

    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run()
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run()
                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print()
                },
                {
                    label: "SpellCheck",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
                    }
                },
            ],
            [
                {
                    label: "Bold",
                    icon: Bold,
                    isActive: editor?.isActive("bold"),
                    onClick: () => editor?.chain().focus().toggleBold().run()
                },
                {
                    label: "Italic",
                    icon: Italic,
                    isActive: editor?.isActive("italic"),
                    onClick: () => editor?.chain().focus().toggleItalic().run()
                },
                {
                    label: "Underline",
                    icon: Underline,
                    isActive: editor?.isActive("underline"),
                    onClick: () => editor?.chain().focus().toggleUnderline().run()
                },
            ],
            [

                {
                    label: "Comment",
                    icon: MessageSquarePlus,
                    onClick: () => editor?.chain().focus().addPendingComment().run(),
                    isActive: editor?.isActive("liveblocksCommentMark")
                },
                {
                    label: "List Todo",
                    icon: ListTodo,
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                    isActive: editor?.isActive("tasklist")
                },
                {
                    label: "Remove Formatting",
                    icon: RemoveFormatting,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                },
            ],
        ];

    return (
        <>
            <div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
                {
                    sections[0].map((item) => (
                        <ToolbarButton key={item.label} {...item} />
                    ))

                }
                <div className="h-6 w-px bg-neutral-400" />

                {/* font family */}
                <FontFamilyButton />

                <div className="h-6 w-px bg-neutral-400" />

                {/* headings */}
                <HeadingLevelButton />

                <div className="h-6 w-px bg-neutral-400" />

                {/* font size */}
                <FontSizeButton />

                <div className="h-6 w-px bg-neutral-400" />

                {/* font styles */}
                {sections[1].map((item) => (
                    <ToolbarButton key={item.label}{...item} />
                ))}

                {/* text color */}
                <TextColorButton />

                {/* higlighter */}
                <HighlightColorButton />
                <div className="h-6 w-px bg-neutral-400" />

                {/* link */}
                <LinkButton />

                {/* img */}
                <ImageButton />

                {/* alignment */}
                <AlignButton />

                {/* line ht */}
                <LineHeightButton />

                {/* list */}
                <ListButton />

                {sections[2].map((item) => (
                    <ToolbarButton key={item.label}{...item} />
                ))}

            </div>
        </>
    )
}
export default ToolBar