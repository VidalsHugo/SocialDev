import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeSave, column, hasMany, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { Post } from 'App/Models/Post'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: string 
  
  @column()
  public photo: string

  @manyToMany(() => Post, {
    pivotTable: 'user_like_posts',
  })
  public likedPosts: ManyToMany<typeof Post>

  @beforeSave()
  public static async hashPassword (user: User){
    if (user.$dirty.password){
      user.password = await Hash.make(user.password)
    }
  }
}
