# Generated by Django 4.2.7 on 2023-11-22 11:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('graduations', '0002_remove_graduation_registration_period_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='graduation',
            old_name='titulo',
            new_name='title',
        ),
    ]
