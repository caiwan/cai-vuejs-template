import sys

from flask import request
import components

import mongoengine


## -- Model

class Task(components.BaseModel):
    title = mongoengine.StringField(max_length=512)
    text = mongoengine.StringField()
    completed = mongoengine.BooleanField(default=False)    
    pass

## --- Service 

class TaskService(components.Service):
    _model_class = Task

## --- controllers

class TaskListController(components.Controller):
    path = "/tasks/"
    _service = TaskService()

    def get(self):
        return self._fetch_all()

    def post(self):
        return self._create(request.json)


class TaskController(components.Controller):
    path = "/tasks/{task_id}"
    _service = TaskService()

    def get(self, task_id):
        return self._read(task_id)

    def put(self, task_id):
        return self._update(task_id)

    def delete(self, task_id):
        return self._delete(task_id)


def init(app, api, models):
    components.register_controllers(api, [TaskController, TaskListController])
    models.extend([Task])
