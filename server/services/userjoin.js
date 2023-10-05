import {UserSchema} from '../models/schemas/user.js'

import {MongoClient} from 'mongodb'

const client = MongoClient;


  client.users.find();