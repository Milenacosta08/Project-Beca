# Generated by Django 4.2.7 on 2023-11-22 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('registration_date_start', models.DateField(default=None)),
                ('registration_date_end', models.DateField(default=None)),
                ('validty_date_start', models.DateField(default=None)),
                ('validty_date_end', models.DateField(default=None)),
                ('vacancies', models.IntegerField()),
                ('value', models.CharField(max_length=20)),
                ('duration', models.CharField(max_length=80)),
                ('link', models.CharField(max_length=200)),
                ('offerer', models.CharField(max_length=200)),
            ],
        ),
    ]