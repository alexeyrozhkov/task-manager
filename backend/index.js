const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/test", (request, response) => {
    response.sendFile(__dirname + "/public/test.html");
});

const todos = [
    {
        id: 0, text: "выучить верстку", completed: true, favorite: true
    },
    {
        id: 1, text: "выучить js", completed: true, favorite: true
    },
    {
        id: 2, text: "выучить react", completed: false, favorite: false
    }
];

const isDefined = value => value !== undefined && value !== null;

app.get("/todos", (request, response) => {
    response.json(todos);
});

app.get("/todos/:id", (request, response) => {
    const selectedItemId = request.params.id;
    const selectedItem = todos.find(item => item.id === +selectedItemId);
    if (!selectedItem) {
        response.status(400).send("Item not found");
        return;
    }
    response.json(selectedItem);
});

app.post("/todos", (request, response) => {
    const id = todos[todos.length - 1].id + 1;
    if (!isDefined(request.body.text)) {
        response.status(400).send("Item must contain text field");
        return;
    }
    if (!isDefined(request.body.completed)) {
        response.status(400).send("Item must contain completed field");
        return;
    }
    if (!isDefined(request.body.favorite)) {
        response.status(400).send("Item must contain favorite field");
        return;
    }
    todos.push({
        text: request.body.text,
        completed: request.body.completed,
        favorite: request.body.favorite,
        id
    });
    response.json({ id });
});

app.put("/todos/:id", (request, response) => {
    const selectedItemId = request.params.id;
    const selectedItem = todos.find(item => item.id === +selectedItemId);
    if (!selectedItem) {
        response.status(400).send("Item not found");
        return;
    }

    if (isDefined(request.body.text)) {
        selectedItem.text = request.body.text;
    }
    if (isDefined(request.body.completed)) {
        selectedItem.completed = request.body.completed;
    }
    if (isDefined(request.body.favorite)) {
        selectedItem.favorite = request.body.favorite;
    }
    response.status(200).send("ok");
});

app.delete("/todos/:id", (request, response) => {
    const selectedItemId = request.params.id;
    const selectedItemIndex = todos.findIndex(item => item.id === +selectedItemId);
    if (selectedItemIndex === -1) {
        response.status(400).send("Item not found");
        return;
    }
    todos.splice(selectedItemIndex, 1);
    response.status(200).send("ok");
});

app.listen(3030, () => {
    console.log("check out the magic at: http://localhost:3030")
})
