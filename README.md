# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

## usersテーブル

|Column|type|Options|
|------|----|-------|
|name|string|null: fals|
|email|text|unique: true, null: fals|

### Association
- has_many :messages
- has_many :groups_uses

## messageテーブル

|Column|type|Options|
|------|----|-------|
|text|text|
|image|text|
|use_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groups_usersテーブル

|Column|type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|type|Options|
|------|----|-------|
|group_name|string|null: false,|

### Association
- has_many :groups_users
- has_many :messags

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
