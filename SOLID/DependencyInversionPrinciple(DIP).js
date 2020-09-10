//This principle states two essential things:

//1-High-level modules should not depend on low-level modules. Both should depend on abstractions.
//2-Abstractions should not depend upon details. Details should depend on abstractions.

//This can be hard to understand at first, but if you've worked with AngularJS, you've seen an implementation of this principle in the form of Dependency Injection (DI).
// While they are not identical concepts, DIP keeps high-level modules from knowing the details of its low-level modules and setting them up.
// It can accomplish this through DI. 
//A huge benefit of this is that it reduces the coupling between modules.
// Coupling is a very bad development pattern because it makes your code hard to refactor.

//As stated previously, JavaScript doesn't have interfaces so the abstractions that are depended upon are implicit contracts. 
//That is to say, the methods and properties that an object/class exposes to another object/class. In the example below, 
//the implicit contract is that any Request module for an InventoryTracker will have a requestItems method.




const mongoose = require('mongoose');
const S3 = require('aws-sdk/clients/s3');

const RecordingSchema = new mongoose.Schema({
    filePath: {
        type: String,
        required: true
    }
})

const s3Client = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

RecordingSchema.methods.getUrl = function() {
    return s3Client.getSignedUrl('getObject', {
        Key: this.filePath,
        Bucket: 'myRecordingsBucket'
    });
}

RecordingSchema.methods.persist = function(data) {
    return s3Client.putObject({
        Bucket: 'myRecordingsBucket',
        Key: this.filePath,
        Body: data
    });
};

// Problem state
// Now it’s when a problem begins. Let’s say each time when user uploads a file for Recording, we want to store it to a backup bucket called myRecordingsBackupBucket,
// having a key postfixed with (backup). I.e. if a recording has filePath: "my-recording-1", it should be also stored as myRecordingsBackupBucket/my-recording-1(backup).

// How could we approach this? We could add persistBackup method:
RecordingSchema.methods.persistBackup = function(data) {
    return s3Client.putObject({
        Bucket: 'myRecordingsBackupBucket',
        Key: `${this.filePath}(backup)`,
        Body: data
    });
};

// and end up having two separate methods for doing essentially similar operation, or parameterize persist method:

RecordingSchema.methods.persist = function(isForBackup = false, data) {
    return s3Client.putObject({
        Bucket: isForBackup ?
            'myRecordingsBackupBucket' : 'myRecordingsBucket',
        Key: isForBackup ?
            `${this.filePath}(backup)` : this.filePath,
        Body: data
    });
};
//having flags like isForBackup in the code to branch off the logic might be a clear indicator of dependency inversion principle violation.


//   Analysis
//   What exactly is wrong with the code above and what can we do to make it better?

//   First of all, any potential consumer of persist method resides closer to input (request handler in this case) and so is a lower-level module than RecordingSchema is.

//   Second observation - when we directly require S3 client constructor and create an instance of it on our schema file definition, we make the latter depend on the former.
// What’s bad about it? Several things in fact. Writing isolated unit tests for such model file becomes much trickier - and we most likely end up mocking aws-sdk/clients/s3 constructor. 
// Second point is flexibility - one day we need to switch from S3 to some other storage, and that will require rewriting both persist and getUrl methods to make use of a new client, which can introduce bugs.

//   Inverting dependency
//   Applying dependency inversion principle to this case, we can formulate: RecordingSchema should not depend on S3 client. Both should depend on abstraction.

//   What kind of abstraction we can think of? Essentially there are two operations to be performed - getting URL for a particular filePath from a storage and uploading data into storage for particular filePath. 
//As we refer to storage twice in te statement above, using it as an abstract entity seems justified.

//   Unfortunately, JavaScript does not have a concept of interface, so we have no option to represent it in code. 
//Using TypeScript we could come up with something like the following:

interface Storage {
    load: (key: string) => Promise < Buffer > ,
        save: (key: string, data: Buffer) => Promise < void >
}
//and make our RecordingSchema to rely on this interface for doing its job:

RecordingSchema.methods.getUrl = function(storage: Storage) {
    return storage.load(this.filePath);
};

RecordingSchema.methods.persist = function(storage: Storage, data: Buffer) {
    return storage.save(this.filePath, data);
};
//   Implementing it in plain JavaScript won’t change anything expect omitting type annotations and keeping Storage interface in your head rather than in code.

//   Note that such change allows us to drop require of aws-sdk/clients/s3 entirely, so no more mocking in unit tests is required - just implement some mock storage that would satisfy Storage (using Jest as testing framework in this example):

// somewhere in Recording model test
const mockStorage = {
    load: jest.fn().mockReturnValue(Promise.resolve(Buffer.from('fake'))),
    save: jest.fn().mockReturnValue(Promise.resolve())
};

const someFakeData = Buffer.from('fake');

await recording.persist(mockStorage, someData)

expect(mockStorage.save).toBeCalledWith(recording.filePath, someFakeData);
//   The last thing to decide is when to create a concrete instance of Storage. Personally I tend to do that at the lowest possible level. For a web server for example, I’d do it when the app is reading its configuration settings and server gets initialized. Such approach allows you to maximize number of further usage options.

//   Whatever particular use case is, it seems like a good idea to create helper modules that produce concrete instances and deal with details, e.g. makeS3Storage.js:

const S3 = require('aws-sdk/clients/s3');

const s3Client = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports = function makeS3Storage(bucketName) {
    return {
        load: (key) => s3Client.getSignedUrl('getObject', {
            Key: key,
            Bucket: bucketName
        }),

        save: (key, data) => s3Client.putObject({
            Bucket: bucketName,
            Key: key,
            Body: data
        });
    };
}





///////////////////////////////////////////////////////////////////////////////////////////////
class ClassA {}
class ClassB {}
class ClassC {}
class Facade {
    constructor() {
        this.a = new ClassA();
        this.b = new ClassB();
        this.c = new ClassC();
    }
}
class Foo {
    constructor() {
        this.facade = new Facade();

    }
}


///////////////////////////////////////////////////////////////////////////////////////////////
class Database {
    constructor() {
        throw new Error(`Abstract class "${this.constructor.name}" cannot be instantiated directly.`);
    }
    insert() {
        throw new Error('You have to implement the method insert!');
    }
    update() {
        throw new Error('You have to implement the method update!');
    }
    delete() {
        throw new Error('You have to implement the method delete!');
    }
}

class MySQLDatabase extends Database {
    insert() {
        // Implementation code
    }

    update() {
        // Implementation code
    }

    delete() {
        // Implementation code
    }
}

class MongoDatabase extends Database {
    insert() {
        // Implementation code
    }
    update() {
        // Implementation code
    }
    delete() {
        // Implementation code
    }
}

class PaymentService {
    constructor(database) {
        this.database = database;
    }

    paymentIsValid() {
        // Implementation code
    }

    openDatabase() {
        // Implementation code
    }

    addNewPayment() {
        // Implementation code
    }

    removePaymentByID() {
        // Implementation code
    }

    updatePaymentByID() {
        // Implementation code
    }
}

const mysal = new MySQLDatabase();
const paymentService = new PaymentService(mysal);
paymentService.openDatabase();





//https://khalilstemmler.com/articles/tutorials/dependency-injection-inversion-explained/