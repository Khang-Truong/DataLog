import pymongo

client = pymongo.MongoClient(
    'mongodb+srv://DataLog:DataLog@cluster0.jzr1zc7.mongodb.net/')

def get_db_names():
    lists = client.list_database_names()
    return lists

def get_db_users(db):
    mydb = client[db]
    mycol = mydb["users"]
    cursor = mycol.find({}, {'_id': 0})
    users = list(cursor)
    return users