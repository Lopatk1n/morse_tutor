from django.db.models import fields
from rest_framework import serializers
from .models import *


class SymbolSerializer(serializers.ModelSerializer):

    class Meta:
        model = Symbol
        fields = '__all__'


class LessonSerializer(serializers.ModelSerializer):

    main_lesson_material = SymbolSerializer(many=True)
    all_lesson_material = SymbolSerializer(many=True)

    class Meta:
        model = Lesson
        fields = '__all__'