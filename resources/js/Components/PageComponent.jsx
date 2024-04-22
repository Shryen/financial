import React from "react";

export default function PageComponent(
    array,
    total,
    markAsEdit,
    deleteRow,
    add,
    isVisibleAdd
) {
    return (
        <Layout>
            <Title>Fizetések</Title>
            {array.length !== 0 ? (
                <div>
                    <div
                        className="grid grid-cols-4 py-2 text-gray-700"
                        style={{ gridTemplateColumns: "1fr 1fr auto auto" }}
                    >
                        <p className="font-bold uppercase text-lg">Fizetés</p>
                        <p className="font-bold uppercase text-lg px-2">Ár</p>
                        <p className="px-4"></p>
                        <p className="px-4"></p>
                    </div>
                    {array.map((f) => (
                        <div key={f.id}>
                            <div
                                className="grid grid-cols-4 py-2 text-gray-700"
                                onDoubleClick={() => markAsEdit(f.id)}
                                key={f.id}
                                style={{
                                    gridTemplateColumns: "1fr 1fr auto auto",
                                }}
                            >
                                <p
                                    className="cursor-pointer hover:font-bold transition-all duration-300"
                                    onClick={() => {
                                        window.location.href = `/arrays/${f.id}`;
                                    }}
                                >
                                    {f.name}
                                </p>
                                <p>${f.price}</p>
                                <div className="flex justify-end w-full">
                                    <EditIcon
                                        onClick={() => markAsEdit(f.id)}
                                        className="text-gray-400 hover:text-gray-800 cursor-pointer transition-all duration-300"
                                    />
                                </div>
                                <div className="flex justify-end w-full">
                                    <DeleteIcon
                                        onClick={() => deleteRow(f.id)}
                                        className="text-gray-300 hover:text-red-800 cursor-pointer transition-all duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {total && (
                        <div className="flex justify-between font-bold mt-2">
                            <p>Összesen:</p>
                            <p>${total}</p>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-red-500 font-bold">
                    Nincsenek fizetések, adj hozzá valamit!
                </p>
            )}

            {isVisibleAdd && (
                <Form className="flex gap-2">
                    <Input
                        type="text"
                        onKeyDown={add}
                        autoFocus
                        placeholder="Előfizetés"
                    />
                    <Input type="number" placeholder="Ár" onKeyDown={add} />
                </Form>
            )}
            <div className="flex justify-between mt-5">
                {edited ? (
                    <form onSubmit={sendData}>
                        {array.map((f) => (
                            <div key={f.id}>
                                <input
                                    type="hidden"
                                    name="name"
                                    value={f.name}
                                />
                                <input
                                    type="hidden"
                                    name="price"
                                    value={f.price}
                                />
                            </div>
                        ))}
                        <Button type="submit">Mentés</Button>
                    </form>
                ) : (
                    <Button onClick={() => setIsVisibleAdd(true)}>
                        Hozzáad
                    </Button>
                )}
            </div>
        </Layout>
    );
}
