# coding=utf-8
# Copyright 2013 Janusz Skonieczny
import logging

from app.main import app
from flask_script import Manager, Command

# from app import config

class InitDatabase(Command):
    """Initialize database"""
    def run(self):
        # import model
        # model.connect_db()
        # model.create_tables()
        # ATM it's not.
        pass
    pass

# manager = Manager(app)
# manager.add_command('initdb', InitDatabase())

# from flask_security import script
# manager.add_command('create-user', script.CreateUserCommand())
# manager.add_command('create-role', script.CreateRoleCommand())
# manager.add_command('add-role', script.AddRoleCommand())
# manager.add_command('remove-role', script.RemoveRoleCommand())
# manager.add_command('activate-user', script.ActivateUserCommand())
# manager.add_command('deactivate-user', script.DeactivateUserCommand())


if __name__ == "__main__":
    manager.run()