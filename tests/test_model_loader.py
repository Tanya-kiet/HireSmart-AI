"""
Unit tests for production ML model loader system.
"""

import unittest
from unittest.mock import patch
from pathlib import Path
import ml.inference.model_loader as model_loader


class TestModelLoader(unittest.TestCase):

    def test_import_does_not_raise(self):
        """Verify that importing model_loader does not attempt file loading or crash."""
        self.assertTrue(hasattr(model_loader, "get_classifier"))
        self.assertTrue(hasattr(model_loader, "get_vectorizer"))
        self.assertTrue(hasattr(model_loader, "get_label_encoder"))

    def test_get_vectorizer_missing_file_raises_runtime_error(self):
        """Verify that attempting to load a missing model file raises RuntimeError with filename."""
        model_loader._vectorizer = None
        with patch.object(model_loader, "MODELS_DIR", Path("/non_existent_dir_12345")):
            with self.assertRaises(RuntimeError) as ctx:
                model_loader.get_vectorizer()
            self.assertIn("Could not load tfidf_vectorizer.pkl", str(ctx.exception))

    def test_get_classifier_missing_file_raises_runtime_error(self):
        """Verify classifier missing file raises RuntimeError with filename."""
        model_loader._classifier = None
        with patch.object(model_loader, "MODELS_DIR", Path("/non_existent_dir_12345")):
            with self.assertRaises(RuntimeError) as ctx:
                model_loader.get_classifier()
            self.assertIn("Could not load resume_classifier.pkl", str(ctx.exception))

    def test_get_label_encoder_missing_file_raises_runtime_error(self):
        """Verify label encoder missing file raises RuntimeError with filename."""
        model_loader._label_encoder = None
        with patch.object(model_loader, "MODELS_DIR", Path("/non_existent_dir_12345")):
            with self.assertRaises(RuntimeError) as ctx:
                model_loader.get_label_encoder()
            self.assertIn("Could not load label_encoder.pkl", str(ctx.exception))

    def test_backwards_compat_getattr(self):
        """Verify module level __getattr__ maps attribute accesses correctly."""
        model_loader._vectorizer = None
        with patch.object(model_loader, "MODELS_DIR", Path("/non_existent_dir_12345")):
            with self.assertRaises(RuntimeError) as ctx:
                _ = model_loader.vectorizer
            self.assertIn("Could not load tfidf_vectorizer.pkl", str(ctx.exception))


if __name__ == "__main__":
    unittest.main()
