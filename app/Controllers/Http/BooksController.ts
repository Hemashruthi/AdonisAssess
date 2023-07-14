import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import {schema} from '@ioc:Adonis/Core/Validator'

export default class BooksController {
    public async insertbooks({request}:HttpContextContract)
    { 
        const insertSchema = schema.create({
            
            book_id: schema.number(),
            book_title: schema.string(),
            author: schema.string(),
            genre: schema.string(),
            published: schema.number()
            
        
        })
        const payload = await request.validate({schema: insertSchema})
        const book = await Book.create(payload);
            // bookId:payload.book_id,
            // bookTitle:payload.book_title,
            // author:payload.author,
            // genre:payload.genre,
            // published:payload.published
            
        return book;
        
    }

    public async displaybooks({}:HttpContextContract)
    {
        const display = await Book.all()
        return display;
    }

    // public async updatebooks({request,params}:HttpContextContract)
    // {
    //     try{
    //     const updateSchema = schema.create({
            
    //         empId: schema.number(),
    //         empName: schema.string(),
    //         deptId: schema.number(),

    //     })
    //     const payload = await request.validate({schema: updateSchema})
    //     const employee = await Employee.findOrFail(params.id)
    //     employee.empId = payload.empId,
    //     employee.empName = payload.empName,
    //     employee.deptId = payload.deptId
    //     await employee.save()
    //     return "Updated successfully"
    // }
    // catch(err)
    // {
    //     return " Updation Failed"
    // }
    // }

    public async updatebooks({request,params}:HttpContextContract)
    {
        try{
        const updateSchema = schema.create({

            book_id: schema.number(),
            book_title: schema.string(),
            author: schema.string(),
            genre: schema.string(),
            published: schema.number(),
        })
        const payload = await request.validate({schema: updateSchema})
        const book = await Book.findOrFail(params.id)
        console.log(book)
            book.bookId = payload.book_id
            book.bookTitle = payload.book_title
            book.author = payload.author
            book.genre = payload.genre
            book.published = payload.published
           
        await book.save()
        return "Updated successfully"
    }
    catch(err)
    {
        return err
}
}

 
    public async deletebooks({params}:HttpContextContract)
    {
        const book = await Book.findBy('id',params.id)
        if(book == null){
            return "No ID Found!!"
        }else{
        await book.delete()
        return "Deleted Successfully"
        }
    }

    public async searchbooks({ request }: HttpContextContract) {
        const searchTerm = request.input('term');
        //const searchTermInt = parseInt(searchTerm);
        const book = await Book.query()
          .where('book_title', 'ilike', `%${searchTerm}%`)
          .orWhere('author','ilike', `%${searchTerm}%`)
          .orWhere('genre', 'ilike', `%${searchTerm}%`)
          .select('*')
          .exec();
      
        return book;
      }
      public async selectById({params}:HttpContextContract)
      {
          const book = await Book.findBy('id',params.id)
          if(book == null){
              return "No ID Found!!"
          }else{
          return book
  }
}
     
}
