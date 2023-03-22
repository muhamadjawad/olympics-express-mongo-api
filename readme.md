## MONGO DB COMMANDS FRO DATABASES

### View all dbs

```
show dbs
```

### create new db

```
use db_name
```

### View current dbs

```
db
```

### Delete DB

go inside db and then

```
dp.dropDatabase()
```

## MONGO DB COMMANDS FOR COLLECTIONS

### Show Collections

```
show collections
```

### create collections

```
dp.createCollection("collection_name")
```

### drop (delete) collections

```
dp.collection_name.drop()
```

### insert one document(row) in collections

```
 db.collection_name.insert({type:"PNG",name:"1.png"})
```

### insert many document(row) in collections

```
 db.collection_name.insertMany([
    {type:"PNG",name:"1.png"},
    {type:"PNG",name:"2.png"},
    {type:"JPG",name:"3.png"},
    ])
```

### show all document(row) in collections

```
 db.collection_name.find({})
```

### search in mongo db

```
 db.collection_name.find({type: "PNG"})
```

### limit finds

```
 db.collection_name.find().limit(4)
```

### count rows

```
 db.collection_name.find().count(4)
```

### update row

```
 db.collection_name.update({name:""})
```

### incrememnt operator

```

 db.collection_name.update({name:""},{
    
 })
```
